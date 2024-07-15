import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:flutter_map_compass/flutter_map_compass.dart';
import 'package:flutter_map_location_marker/flutter_map_location_marker.dart';
import 'package:flutter_map_math/flutter_geo_math.dart';
import 'package:geolocator/geolocator.dart';
import 'package:latlong2/latlong.dart';
import 'package:loader_overlay/loader_overlay.dart';
import 'package:open_route_service/open_route_service.dart';
import 'package:toastification/toastification.dart';
import 'package:url_launcher/url_launcher.dart';

import '/src/data/data_controller.dart';
import '/src/utils/app_const.dart';
import '/src/utils/map_utils.dart';
import '/src/utils/size_config.dart';
import '/src/view/settings_view.dart';
// Hold the main widget map view, that contains
// all spots, shops and bars saved on server. Handle
// the user interaction with map to add/edit/remove markers.
class MapExploreView extends StatefulWidget {
  const MapExploreView({
    super.key,
    required this.dataController,
  });

  static const routeName = '/mapexplore';
  final DataController dataController;

  @override
  MapExploreViewState createState() {
    return MapExploreViewState();
  }
}

class MapExploreViewState extends State<MapExploreView> with TickerProviderStateMixin {
  // FlutterMap controller
  late MapController _mapController;
  // Map data
  late List<Polygon> citiesBoundsPolygons;
  late List<Marker> citiesMarkers;
  // Map user session settings (not saved upon restart)
  String mapLayer = 'osm';
  bool doubleTap = false; // Enter double tap mode
  bool doubleTapPerformed = false; // Double tap actually happened
  final OpenRouteService ors = OpenRouteService(
    apiKey: AppConst.osrApiKey!,
  );
  // Position alignment stream controller
  late AlignOnUpdate _alignPositionOnUpdate;
  late final StreamController<double?> _alignPositionStreamController;
  double restoredZoomed = 0; // To restore zoom level when unlocking position
  // Navigation route points
  List<LatLng> navRoutePoints = [];
  // InitState main purpose is to async load spots/shops/bars
  @override
  void initState() {
    super.initState();
    // User location stream controller
    _alignPositionOnUpdate = AlignOnUpdate.never;
    _alignPositionStreamController = StreamController<double?>();
    // Create internal MapController
    _mapController = MapController();
    // Map data
    citiesBoundsPolygons = MapUtils.buildCitiesBoundsAsPolygons(widget.dataController.citiesBounds);
    citiesMarkers = MapUtils.buildCitiesMarkers(
      context,
      _mapController,
      this,
      computeRouteToMark,
      widget.dataController.citiesMarkers,
    );
    // Allow map build while gettings marks from server
    setState(() {});
  }
  // Clear position stream upon dispose
  @override
  void dispose() {
    // Release user position stream on dispose widget
    _alignPositionStreamController.close();
    super.dispose();
  }

  // Navigation routing
  void computeRouteToMark(
    LatLng destination,
  ) async {
    // Clear any previous route
    setState(() => navRoutePoints = []);
    // Get latest known position to start the path with
    Position? position = await Geolocator.getLastKnownPosition();
    // First ensure route is not over threshold
    double distance = FlutterMapMath().distanceBetween(
      position!.latitude,
      position.longitude,
      destination.latitude,
      destination.longitude,
      'meters',
    );
    if (distance > AppConst.maxDistanceForRoute) {
      if (mounted) {
        // Mark too far from user
        toastification.show(
          context: context,
          title: Text(
            AppLocalizations.of(context)!.mapRouteTooFarToastTitle,
          ),
          description: Text(
            AppLocalizations.of(context)!.mapRouteTooFarToastDescription,
            style: const TextStyle(
              fontStyle: FontStyle.italic,
            ),
          ),
          type: ToastificationType.error,
          style: ToastificationStyle.flatColored,
          autoCloseDuration: const Duration(
            seconds: 5,
          ),
          showProgressBar: false,
        );
      }
      return;
    }
    // Now perform ORS route request
    if (mounted) {
      // Put loading overlay to notify user a computation is in progress
      context.loaderOverlay.show();
      // Request route from ORS
      try {
        final List<ORSCoordinate> routeCoordinates = await ors.directionsRouteCoordsGet(
          startCoordinate: ORSCoordinate(
            latitude: position.latitude,
            longitude: position.longitude,
          ),
          endCoordinate: ORSCoordinate(
            latitude: destination.latitude,
            longitude: destination.longitude,
          ),
        );
        // Build final polyline points
        final List<LatLng> routePoints = routeCoordinates
          .map((coordinate) => LatLng(
            coordinate.latitude,
            coordinate.longitude,
          )).toList();
        // Center map between path bounds
        LatLngBounds bounds = LatLngBounds.fromPoints(routePoints);
        _mapController.fitCamera(
          CameraFit.bounds(
            bounds: bounds,
            padding: EdgeInsets.all(
              SizeConfig.paddingLarge,
            ),
          ),
        );
        // Set widget state with found route
        setState(() {
          navRoutePoints = routePoints;
          // Hide overlay loader
          context.loaderOverlay.hide();
          // Notify user the route was found and is displayed
          toastification.show(
            context: context,
            title: Text(
              AppLocalizations.of(context)!.mapRouteFoundToastTitle,
            ),
            description: Text(
              AppLocalizations.of(context)!.mapRouteFoundToastDescription,
              style: const TextStyle(
                fontStyle: FontStyle.italic,
              ),
            ),
            type: ToastificationType.success,
            style: ToastificationStyle.flatColored,
            autoCloseDuration: const Duration(
              seconds: 5,
            ),
            showProgressBar: false,
          );
        });
      } catch (e) {
        if (mounted) {
          // Hide overlay loader anyway
          context.loaderOverlay.hide();
          // Unable to get route from ORS
          // Error ORS1
          toastification.show(
            context: context,
            title: Text(
              AppLocalizations.of(context)!.mapRouteNotFoundToastTitle,
            ),
            description: Text(
              AppLocalizations.of(context)!.mapRouteNotFoundToastDescription,
              style: const TextStyle(
                fontStyle: FontStyle.italic,
              ),
            ),
            type: ToastificationType.error,
            style: ToastificationStyle.flatColored,
            autoCloseDuration: const Duration(
              seconds: 5,
            ),
            showProgressBar: false,
          );
        }
        return;
      }
    }
  }
  // Map widget builing
  @override
  Widget build(
    BuildContext context,
  ) {
    SizeConfig().init(context);
    return Scaffold(
      appBar: AppBar(
        title: Text(
          AppLocalizations.of(context)!.exploreAppBarTitle,
        ),
        shadowColor: Theme.of(context).colorScheme.shadow,
        actions: [
          // Open application SettingsView
          IconButton(
            icon: const Icon(
              Icons.settings
            ),
            onPressed: () => Navigator.restorablePushNamed(
              context,
              SettingsView.routeName
            ),
          ),
        ],
      ),
      resizeToAvoidBottomInset: false, // Do not move map when keyboard appear
      body: FlutterMap(
        mapController: _mapController,
        options: MapOptions(
          initialCenter: const LatLng(
            48.53183906441962,
            2.053756713867188,
          ),
          initialZoom: 11.0,
          interactionOptions: const InteractionOptions(
            flags: InteractiveFlag.pinchZoom | InteractiveFlag.drag | InteractiveFlag.rotate
          ),
          minZoom: 11.0,
          maxZoom: 19,
          // Force camera to remain on LatLng ranges
          cameraConstraint: CameraConstraint.contain(
            bounds: LatLngBounds(
              const LatLng(48.75361871872025, 1.7690606689453127),
              const LatLng(48.24456366049887, 2.343395996093750),
            ),
          ),
          // User position tracking on map
          onPositionChanged: (
            position,
            hasGesture,
          ) {
            if (hasGesture && _alignPositionOnUpdate != AlignOnUpdate.never) {
              setState(() => _alignPositionOnUpdate = AlignOnUpdate.never);
            }
          },
          // Map clicked callback, add marker only if logged in
          onTap: (
            TapPosition position,
            LatLng latLng,
          ) {
            // First user tap
            if (doubleTap == false) {
              doubleTap = true;
              // Restore flag 
              Future.delayed(const Duration(milliseconds: 300), () {
                doubleTap = false;
              });
            } else {
              doubleTapPerformed = true;
              // Restore flag 
              Future.delayed(const Duration(milliseconds: 300), () {
                doubleTapPerformed = false;
              });
              // Only perform double tap zoom if not exceeding maxZoom for map
              if (_mapController.camera.zoom + 1 <= 19) {
                MapUtils.animatedMapMove(
                  LatLng(
                    latLng.latitude,
                    latLng.longitude,
                  ),
                  _mapController.camera.zoom + 1,
                  _mapController,
                  this,
                );
              }
            }
          },
        ),
        children: [
          TileLayer(
            urlTemplate: (mapLayer == 'osm')
              ? 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
              : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            userAgentPackageName: 'com.messebasseproduction.mondourdannais',
          ),
          CurrentLocationLayer(
            alignPositionStream: _alignPositionStreamController.stream,
            alignPositionOnUpdate: _alignPositionOnUpdate,
            style: const LocationMarkerStyle(
              showHeadingSector: false,
              showAccuracyCircle: true,
            ),
          ),
          PolygonLayer(
            polygons: citiesBoundsPolygons,
          ),
          MarkerLayer(
            markers: citiesMarkers,
          ),
          // Navigation route layer, positionned to be bottom all other layers
          PolylineLayer(
            polylines: [
              Polyline(
                points: navRoutePoints,
                color: Theme.of(context).colorScheme.primary,
                strokeWidth: 5,
              ),
            ],
          ),
          MapCompass.cupertino(
            padding: EdgeInsets.only(
              right: SizeConfig.padding,
              top: SizeConfig.padding,
            ),
          ),
          Scalebar(
            alignment: Alignment.bottomRight,
            padding: EdgeInsets.only(
              bottom: SizeConfig.padding,
              right: (SizeConfig.padding * 2) + 48.0, // Default floating button width and twice padding
            ),
          ),
          RichAttributionWidget(
            alignment: AttributionAlignment.bottomLeft,
            showFlutterMapAttribution: false,
            popupBackgroundColor: Theme.of(context).colorScheme.primary,
            closeButton: (
              BuildContext context,
              Function close,
            ) {
              return IconButton(
                icon: const Icon(
                  Icons.cancel_outlined,
                ),
                color: Theme.of(context).colorScheme.surface,
                onPressed: () => close(),
                style: const ButtonStyle(),
              );
            },
            attributions: [
              TextSourceAttribution(
                (mapLayer == 'osm')
                  ? AppLocalizations.of(context)!.mapOSMContributors
                  : AppLocalizations.of(context)!.mapEsriContributors,
                textStyle: TextStyle(
                  color: Theme.of(context).colorScheme.surface,
                  fontStyle: FontStyle.italic,
                ),
                onTap: () => launchUrl(
                  (mapLayer == 'osm')
                    ? Uri.parse('https://openstreetmap.org/copyright')
                    : Uri.parse('https://www.esri.com'),
                ),
              ),
              TextSourceAttribution(
                AppLocalizations.of(context)!.mapFlutterMapContributors,
                textStyle: TextStyle(
                  color: Theme.of(context).colorScheme.surface,
                  fontStyle: FontStyle.italic,
                ),
                onTap: () => launchUrl(
                  Uri.parse('https://github.com/fleaflet/flutter_map'),
                ),
              ),
            ],
          ),
        ],
      ),
      // Map buttons for profile, centerOn user and map options
      floatingActionButton: Wrap(
        direction: Axis.vertical,
        children: <Widget>[
           // Center on user (and lock position on it)
          Container(
            margin: EdgeInsets.symmetric(
              vertical: SizeConfig.paddingTiny,
            ),
            child: FloatingActionButton(
              heroTag: 'centerOnButton',
              onPressed: () {
                if (_alignPositionOnUpdate == AlignOnUpdate.never) {
                  restoredZoomed = _mapController.camera.zoom;
                  _alignPositionStreamController.add(18);
                  setState(() => _alignPositionOnUpdate = AlignOnUpdate.always);
                } else {
                  MapUtils.animatedMapMove(
                    _mapController.camera.visibleBounds.center,
                    restoredZoomed,
                    _mapController,
                    this,
                  );
                  setState(() => _alignPositionOnUpdate = AlignOnUpdate.never);
                }
              },
              foregroundColor: null,
              backgroundColor: null,
              child: Icon(
                Icons.gps_fixed,
                color: (_alignPositionOnUpdate == AlignOnUpdate.always)
                  ? Theme.of(context).colorScheme.secondary
                  : null,
              ),
            ),
          ),
          // Zoom out
          Container(
            margin: EdgeInsets.symmetric(
              vertical: SizeConfig.paddingTiny,
            ),
            child: FloatingActionButton(
              heroTag: 'zoomOutButton',
              onPressed: () {
                if (_mapController.camera.zoom - 1 >= 11) {
                  MapUtils.animatedMapMove(
                    _mapController.camera.center,
                    _mapController.camera.zoom - 1,
                    _mapController,
                    this,
                  );
                }
              },
              foregroundColor: null,
              backgroundColor: null,
              child: const Icon(
                Icons.zoom_out,
              ),
            ),
          ),
          // Zoom in
          Container(
            margin: EdgeInsets.symmetric(
              vertical: SizeConfig.paddingTiny,
            ),
            child: FloatingActionButton(
              heroTag: 'zoomInButton',
              onPressed: () {
                if (_mapController.camera.zoom + 1 <= 19) {
                  MapUtils.animatedMapMove(
                    _mapController.camera.center,
                    _mapController.camera.zoom + 1,
                    _mapController,
                    this,
                  );
                }
              },
              foregroundColor: null,
              backgroundColor: null,
              child: const Icon(
                Icons.zoom_in,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

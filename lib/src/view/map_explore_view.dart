import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:flutter_map_location_marker/flutter_map_location_marker.dart';
import 'package:latlong2/latlong.dart';
import 'package:url_launcher/url_launcher.dart';

import '/src/data/data_controller.dart';
import '/src/utils/map_utils.dart';
import '/src/utils/size_config.dart';
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
  // Map user session settings (not saved upon restart)
  String mapLayer = 'osm';
  bool doubleTap = false; // Enter double tap mode
  bool doubleTapPerformed = false; // Double tap actually happened
  // Position alignment stream controller
  late AlignOnUpdate _alignPositionOnUpdate;
  late final StreamController<double?> _alignPositionStreamController;
  double restoredZoomed = 0; // To restore zoom level when unlocking position
  // InitState main purpose is to async load spots/shops/bars
  @override
  void initState() {
    super.initState();
    // User location stream controller
    _alignPositionOnUpdate = AlignOnUpdate.never;
    _alignPositionStreamController = StreamController<double?>();
    // Create internal MapController
    _mapController = MapController();
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
  // Map widget builing
  @override
  Widget build(
    BuildContext context,
  ) {
    SizeConfig().init(context);
    return Scaffold(
      appBar: null,
      resizeToAvoidBottomInset: false, // Do not move map when keyboard appear
      body: FlutterMap(
        mapController: _mapController,
        options: MapOptions(
          initialCenter: const LatLng(
            48.52778,
            2.068244,
          ),
          initialZoom: 11.0,
          interactionOptions: const InteractionOptions(
            flags: InteractiveFlag.pinchZoom | InteractiveFlag.drag
          ),
          minZoom: 2,
          maxZoom: 19,
          // Force camera to remain on LatLng ranges
          cameraConstraint: CameraConstraint.contain(
            bounds: LatLngBounds(
              const LatLng(-90, -180),
              const LatLng(90, 180),
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
            print(latLng);
            // First user tap
            if (doubleTap == false) {
              doubleTap = true;
              // Restore flag 
              Future.delayed(const Duration(milliseconds: 300), () {
                doubleTap = false;
                if (doubleTapPerformed == false) {
                  // Compute current map bound and lat/lng range for those bounds
                  LatLngBounds bounds = _mapController.camera.visibleBounds;
                  double mapLatRange = (SizeConfig.modalHeightRatio * (bounds.northWest.latitude - bounds.southEast.latitude).abs()) / 400;
                  // Move map to the marker position, with modal opened offset
                  MapUtils.animatedMapMove(
                    LatLng(
                      latLng.latitude - (mapLatRange / 2),
                      latLng.longitude,
                    ),
                    _mapController.camera.zoom + 2,
                    _mapController,
                    this,
                  );
                }
                setState(() {});
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
          // Map filtering operations
          Container(
            margin: EdgeInsets.symmetric(
              vertical: SizeConfig.paddingTiny,
            ),
            child: FloatingActionButton(
              heroTag: 'homeButton',
              onPressed: () => Navigator.of(context).pop(),
              foregroundColor: null,
              backgroundColor: null,
              child: const Icon(
                Icons.home,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

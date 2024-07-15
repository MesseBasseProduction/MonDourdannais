import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:latlong2/latlong.dart';
import 'package:mondourdannais/src/utils/map_utils.dart';
import 'package:url_launcher/url_launcher.dart';

import '/src/utils/size_config.dart';
// MarkerView clas shandle the whole content for the flutter_map ;
// the pin on map, and the modal sheet that opens when marker is clicked.
class MarkerFragmentView {
  // Generic marker creator, used for Shops, Spots and bars
  static Marker buildMarker(
    BuildContext context,
    MapController mapController,
    TickerProvider tickerProvider,
    Function computeRouteToMark,
    Map<String, dynamic> input,
  ) {
    return Marker(
      height: SizeConfig.mapMarkerSize,
      width: SizeConfig.mapMarkerSize,
      point: LatLng(
        input['lat'],
        input['lng'],
      ),
      child: GestureDetector(
        onTap: () => onMarkerTapped(
          context,
          mapController,
          tickerProvider,
          computeRouteToMark,
          input,
        ),
        child: SvgPicture.asset(
           'assets/images/marker/${input['type']}.svg',
          height: SizeConfig.iconSize,
          width: SizeConfig.iconSize,
        ),
      ),
    );
  }
  // Marker callback when clicked to display its information
  static void onMarkerTapped(
    BuildContext context,
    MapController mapController,
    TickerProvider tickerProvider,
    Function computeRouteToMark,
    Map<String, dynamic> input,
  ) {
    SizeConfig().init(context);
    // Compute map lat/lng range with apsect ratio in consideration
    LatLngBounds bounds = mapController.camera.visibleBounds;
    double mapLatRange = (SizeConfig.modalHeightRatio * (bounds.northWest.latitude - bounds.southEast.latitude).abs()) / 400;
    // Move map to the marker position
    MapUtils.animatedMapMove(
      LatLng(
        input['lat'] - (mapLatRange / 2),
        input['lng'],
      ),
      mapController.camera.zoom + 2,
      mapController,
      tickerProvider,
    );

    showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      barrierColor: Colors.black.withOpacity(0.1),
      builder: (
        BuildContext context,
      ) {
        return Container(
          height: (SizeConfig.modalHeightRatio * SizeConfig.screenHeight) / 100, // Taking screenHeightRatio % of screen height
          width: SizeConfig.screenWidth,
          color: Theme.of(context).colorScheme.background,
          // Modal inner padding
          padding: EdgeInsets.symmetric(
            horizontal: SizeConfig.padding,
          ),
          child: SingleChildScrollView(
            padding: EdgeInsets.all(
              SizeConfig.padding,
            ),
            child: Column(
              children: [
                Text(
                  input['name'],
                  style: TextStyle(
                    fontSize: SizeConfig.fontTextBigSize,
                    fontWeight: FontWeight.bold,
                    color: Theme.of(context).colorScheme.onPrimary,
                  ),
                  textAlign: TextAlign.center,
                ),
                SizedBox(
                  height: SizeConfig.padding,
                ),
                Text(
                  input['address'],
                  style: TextStyle(
                    fontStyle: FontStyle.italic,
                    color: Theme.of(context).colorScheme.onPrimary,
                  ),
                  textAlign: TextAlign.center,
                ),
                Text(
                  input['town'],
                  style: TextStyle(
                    fontStyle: FontStyle.italic,
                    color: Theme.of(context).colorScheme.onPrimary,
                  ),
                  textAlign: TextAlign.center,
                ),
                SizedBox(
                  height: SizeConfig.padding,
                ),
                ElevatedButton(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(
                        Icons.route,
                      ),
                      SizedBox(
                        width: SizeConfig.paddingSmall,
                      ),
                      Text(
                        AppLocalizations.of(context)!.markerFragmentRoute,
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                  onPressed: () {
                    Navigator.of(context).pop(false);
                    computeRouteToMark(
                      LatLng(
                        input['lat'],
                        input['lng'],
                      ),
                    );                    
                  },
                ),
                SizedBox(
                  height: SizeConfig.padding,
                ),
                Text(
                  input['info'],
                  style: TextStyle(
                    color: Theme.of(context).colorScheme.onPrimary,
                  ),
                  textAlign: TextAlign.center,
                ),
                SizedBox(
                  height: SizeConfig.padding,
                ),
                (input['phone'] != '')
                  ? ElevatedButton(
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(
                            Icons.phone,
                          ),
                          SizedBox(
                            width: SizeConfig.paddingSmall,
                          ),
                          Text(
                            AppLocalizations.of(context)!.markerFragmentPhone,
                            textAlign: TextAlign.center,
                          ),
                        ],
                      ),
                      onPressed: () => launchUrl(
                        Uri.parse('tel:${input['phone']}'),
                      ),
                    )
                  : const SizedBox.shrink(),
                (input['website'] != '')
                  ? ElevatedButton(
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(
                            Icons.language,
                          ),
                          SizedBox(
                            width: SizeConfig.paddingSmall,
                          ),
                          Text(
                            AppLocalizations.of(context)!.markerFragmentWebsite,
                            textAlign: TextAlign.center,
                          ),
                        ],
                      ),
                      onPressed: () => launchUrl(
                        Uri.parse(input['website']),
                      ),
                    )
                  : const SizedBox.shrink(),                
              ],
            ),
          ),
        );
      }
    ).whenComplete(() {
      // Move back camera only
      MapUtils.animatedMapMove(
        LatLng(
          input['lat'],
          input['lng'],
        ),
        mapController.camera.zoom - 2,
        mapController,
        tickerProvider,
      );
    });
  }
}

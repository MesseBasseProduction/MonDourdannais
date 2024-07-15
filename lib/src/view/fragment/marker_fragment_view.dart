import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:latlong2/latlong.dart';
import 'package:mondourdannais/src/utils/map_utils.dart';

import '/src/utils/size_config.dart';
// MarkerView clas shandle the whole content for the flutter_map ;
// the pin on map, and the modal sheet that opens when marker is clicked.
class MarkerFragmentView {
  // Generic marker creator, used for Shops, Spots and bars
  static Marker buildMarker(
    BuildContext context,
    MapController mapController,
    TickerProvider tickerProvider,
    Map<String, dynamic> input,

/*
    BuildContext context,
    MapController mapController,
    TickerProvider tickerProvider,
    Function computeRouteToMark,
    Function removeCallback,
    Function editCallback,
*/
  ) {
//    SizeConfig().init(context);
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
            child: Column(
              children: [
                Text(input['name']),
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

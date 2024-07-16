import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:latlong2/latlong.dart';
import 'package:url_launcher/url_launcher.dart';

import '/src/data/data_controller.dart';
import '/src/utils/map_utils.dart';
import '/src/utils/mark_utils.dart';
import '/src/utils/size_config.dart';
// MarkerView clas shandle the whole content for the flutter_map ;
// the pin on map, and the modal sheet that opens when marker is clicked.
class MarkerFragmentView {
  // Generic marker creator, used for Shops, Spots and bars
  static Marker buildMarker(
    BuildContext context,
    DataController dataController,
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
          dataController,
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
    DataController dataController,
    MapController mapController,
    TickerProvider tickerProvider,
    Function computeRouteToMark,
    Map<String, dynamic> input,
  ) {
    SizeConfig().init(context);
    // Compute map lat/lng range with apsect ratio in consideration
    LatLngBounds bounds = mapController.camera.visibleBounds;
    double mapLatRange = (SizeConfig.modalHeightRatio * (bounds.northWest.latitude - bounds.southEast.latitude).abs()) / 400;
    mapController.rotate(0);
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

    bool isMarkOpened = MarkUtils.isMarkOpened(
      input,
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
                // Marker name
                Text(
                  input['name'][dataController.appLocale.toString()],
                  style: TextStyle(
                    fontSize: SizeConfig.fontTextBigSize,
                    fontWeight: FontWeight.bold,
                    color: Theme.of(context).colorScheme.onPrimary,
                  ),
                  textAlign: TextAlign.center,
                ),
                SizedBox(
                  height: SizeConfig.paddingSmall,
                ),
                // Marker address
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
                // Marker open state and display timetable dialog
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    side: BorderSide(
                      color: (isMarkOpened == true)
                        ? Colors.green
                        : Colors.red,
                    ),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.schedule,
                        color: (isMarkOpened == true)
                          ? Colors.green
                          : Colors.red,
                      ),
                      SizedBox(
                        width: SizeConfig.paddingSmall,
                      ),
                      Text(
                        (isMarkOpened == true)
                          ? (input['alwaysOpened'] == true)
                            ? 'Toujours ouvert'
                            : 'Ouvert'
                          : (input['alwaysClosed'] == true) 
                            ? 'Toujours fermé'
                            : 'Fermé',
                          style: TextStyle(
                          color: (isMarkOpened == true)
                            ? Colors.green
                            : Colors.red,                            
                          ),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                  onPressed: () {
                    if (input['alwaysOpened'] == true || input['alwaysClosed'] == true) {
                      return;
                    } else {
                      timetableDialog(
                        context,
                        input,
                      );
                    }
                  },
                ),
                // Route to marker
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
                // Marker information
                Text(
                  input['info'][dataController.appLocale.toString()],
                  style: TextStyle(
                    color: Theme.of(context).colorScheme.onPrimary,
                  ),
                  textAlign: TextAlign.center,
                ),
                SizedBox(
                  height: SizeConfig.padding,
                ),
                // Marker associated phone if any
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
                // Marker associated website if any
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
                SizedBox(
                  height: SizeConfig.padding,
                ),
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

  static void timetableDialog(
    BuildContext context,
    Map<String, dynamic> input,
  ) {
    showDialog(
      context: context,
      builder: (
        context,
      ) {
        List<Widget> buildWeekDays() {
          List<Widget> output = [];
          for (var i = 0; i < input['timetable'].length; ++i) {
            if (input['timetable'][i]['isOpen'] == false) {
              output.add(
                Card(
                  child: Column(
                    children: [
                      Text(
                        AppLocalizations.of(context)!.weekDays(i.toString()),
                      ),
                      const Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          Text('Fermé')
                        ],
                      ),
                    ],
                  ),
                ),
              );
            } else {
              Map<String, dynamic> item = input['timetable'][i];
              if (input['timetable'][i]['break'] == null) {
                output.add(
                  Card(
                    child: Column(
                      children: [
                        Text(
                          AppLocalizations.of(context)!.weekDays(i.toString()),
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceAround,
                          children: [
                            Text(
                              '${item['open']['h']}h${item['open']['m']} ‒ ${item['close']['h']}h${item['close']['m']}',
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                );
              } else {
                List<Widget> closures = [];
                for (var j = 1; j < item['break'].length; ++j) {
                  closures.add(
                    Text(
                      '${item['break'][j - 1]['end']['h']}h${item['break'][j - 1]['end']['m']} ‒ ${item['break'][j]['start']['h']}h${item['break'][j]['start']['m']}',
                    ),
                  );
                }

                output.add(
                  Card(
                    child: Column(
                      children: [
                        Text(
                          AppLocalizations.of(context)!.weekDays(i.toString()),
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceAround,
                          children: [
                            Text(
                              '${item['open']['h']}h${item['open']['m']} ‒ ${item['break'][0]['start']['h']}h${item['break'][0]['start']['m']}',
                            ),
                            ...closures,
                            Text(
                              '${item['break'][item['break'].length - 1]['end']['h']}h${item['break'][item['break'].length - 1]['end']['m']} ‒ ${item['close']['h']}h${item['close']['m']}',
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                );
              }
            }
          }
          return output;
        }
        
        return Dialog(
          child: Padding(
            padding: EdgeInsets.symmetric(
              horizontal: SizeConfig.paddingSmall,
              vertical: SizeConfig.padding,
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Text(
                  'Horaires',
                  style: TextStyle(
                    fontSize: SizeConfig.fontTextLargeSize,
                  ),
                ),
                SizedBox(
                  height: SizeConfig.padding,
                ),
                ...buildWeekDays(),
                SizedBox(
                  height: SizeConfig.padding,
                ),
                ElevatedButton(
                  child: const Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        'Close',
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                  onPressed: () => Navigator.of(context).pop(),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}

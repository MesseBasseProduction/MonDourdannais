import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:toggle_switch/toggle_switch.dart';

import '/src/data/data_controller.dart';
import '/src/utils/size_config.dart';

class MapOptionsFragmentView {
  static void showModal(
    BuildContext context,
    DataController dataController,
    Function setter,
  ) {
    showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      barrierColor: Colors.black.withOpacity(0.1),
      builder: (
        BuildContext context,
      ) {
        SizeConfig().init(context);
        MediaQueryData mediaQueryData = MediaQuery.of(context);
        // Local working values
        String mapLayer = dataController.mapLayer;

        return StatefulBuilder(
          builder: (
            BuildContext context,
            StateSetter setModalState,
          ) {
            return Container(
              height: (25 * mediaQueryData.size.height) / 100,
              color: Theme.of(context).colorScheme.background,
              // Modal inner padding
              padding: EdgeInsets.symmetric(
                horizontal: SizeConfig.padding,
              ),
              child: Center(
                child: ListView(
                  children: [
                    Column(
                      children: [
                        SizedBox(
                          height: SizeConfig.padding,
                        ),
                        // Modal title
                        Text(
                          AppLocalizations.of(context)!.mapOptionsTitle,
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: SizeConfig.fontTextTitleSize,
                          ),
                        ),
                        SizedBox(
                          height: SizeConfig.padding,
                        ),
                        // Map layer type subtitle
                        Text(
                          AppLocalizations.of(context)!.mapOptionsLayerStyle,
                          style: TextStyle(
                            fontSize: SizeConfig.fontTextLargeSize,
                          ),
                        ),
                        SizedBox(
                          height: SizeConfig.paddingSmall,
                        ),
                        // Map layer type switch
                        ToggleSwitch(
                          customWidths: [
                            mediaQueryData.size.width / 3,
                            mediaQueryData.size.width / 3,
                          ],
                          initialLabelIndex: (mapLayer == 'osm')
                            ? 0
                            : 1,
                          totalSwitches: 2,
                          labels: [
                            AppLocalizations.of(context)!.mapOptionsLayerPlan,
                            AppLocalizations.of(context)!.mapOptionsLayerSatellite,
                          ],
                          onToggle: (
                            index,
                          ) {
                            if (index == 0) {
                              mapLayer = 'osm';
                              setter(
                                'mapLayer',
                                mapLayer,
                              );
                              setModalState(() {});
                            } else {
                              mapLayer = 'esri';
                              setter(
                                'mapLayer',
                                mapLayer,
                              );
                              setModalState(() {});
                            }
                          },
                        ),
                        SizedBox(
                          height: SizeConfig.paddingLarge,
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            );
          },
        );
      },
    );
  }
}

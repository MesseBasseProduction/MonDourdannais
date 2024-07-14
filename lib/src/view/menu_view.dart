import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

import '/src/data/data_controller.dart';
import '/src/utils/app_const.dart';
import '/src/utils/size_config.dart';
import '/src/view/about_view.dart';
import '/src/view/map_explore_view.dart';
import '/src/view/my_city_view.dart';
import '/src/view/search_view.dart';
import '/src/view/settings_view.dart';
// Startup help view will display the user
// information about what the app does, and
// let him choose the main city to user
class MenuView extends StatefulWidget {
  const MenuView({
    super.key,
    required this.dataController,
  });

  static const routeName = '/menu';
  final DataController dataController;

  @override
  MenuViewState createState() {
    return MenuViewState();
  }
}

class MenuViewState extends State<MenuView> {
  @override
  Widget build(
    BuildContext context,
  ) {
    SizeConfig().init(context);
    String selectedCity = widget.dataController.userMainCity;

    return Scaffold(
      appBar: AppBar(
        title: Text(
          AppLocalizations.of(context)!.menuAppBarTitle,
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
      body: SafeArea(
        child: Container(
          padding: EdgeInsets.symmetric(
            horizontal: SizeConfig.padding,
            vertical: SizeConfig.paddingLarge,
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Column(
                children: [
                  Text(
                    AppLocalizations.of(context)!.appTitle,
                    style: TextStyle(
                      fontSize: SizeConfig.fontTextTitleSize,
                      fontWeight: FontWeight.bold,
                      color: Theme.of(context).colorScheme.onPrimary,
                    ),
                    textAlign: TextAlign.center,                  
                  ),
                ],
              ),
              Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        GestureDetector(
                          onTap: () => Navigator.restorablePushNamed(
                            context,
                            MapExploreView.routeName
                          ),
                          child: Card(
                            child: SizedBox(
                              height: (SizeConfig.screenWidth / 2) - (SizeConfig.padding * 2),
                              width: (SizeConfig.screenWidth / 2) - (SizeConfig.padding * 2),
                              child: Padding(
                                padding: EdgeInsets.all(
                                  SizeConfig.paddingSmall,
                                ),
                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: [
                                    Icon(
                                      Icons.public,
                                      size: SizeConfig.iconSizeLarge,
                                      color: Theme.of(context).colorScheme.onSurface,
                                    ),
                                    SizedBox(
                                      height: SizeConfig.paddingTiny,
                                    ),
                                    Text(
                                      'Explorer',
                                      style: TextStyle(
                                        color: Theme.of(context).colorScheme.onPrimary,
                                        fontWeight: FontWeight.bold,
                                      ),
                                      textAlign: TextAlign.center,
                                    ),
                                    SizedBox(
                                      height: SizeConfig.paddingTiny,
                                    ),
                                    Text(
                                      'Exploration libre de la Carte du Dourdannais',
                                      style: TextStyle(
                                        color: Theme.of(context).colorScheme.onPrimary,
                                        fontSize: SizeConfig.fontTextSmallSize,
                                        fontStyle: FontStyle.italic,
                                      ),
                                      textAlign: TextAlign.center,
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                        ),
                        GestureDetector(
                          onTap: () => Navigator.restorablePushNamed(
                            context,
                            SearchView.routeName
                          ),
                          child: Card(
                            child: SizedBox(
                              height: (SizeConfig.screenWidth / 2) - (SizeConfig.padding * 2),
                              width: (SizeConfig.screenWidth / 2) - (SizeConfig.padding * 2),
                              child: Padding(
                                padding: EdgeInsets.all(
                                  SizeConfig.paddingSmall,
                                ),
                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: [
                                    Icon(
                                      Icons.travel_explore,
                                      size: SizeConfig.iconSizeLarge,
                                      color: Theme.of(context).colorScheme.onSurface,
                                    ),
                                    SizedBox(
                                      height: SizeConfig.paddingTiny,
                                    ),
                                    Text(
                                      'Rechercher',
                                      style: TextStyle(
                                        color: Theme.of(context).colorScheme.onPrimary,
                                        fontWeight: FontWeight.bold,
                                      ),
                                      textAlign: TextAlign.center,
                                    ),
                                    SizedBox(
                                      height: SizeConfig.paddingTiny,
                                    ),
                                    Text(
                                      'Filtrer la carte pour trouver ce qu\'il vous faut',
                                      style: TextStyle(
                                        color: Theme.of(context).colorScheme.onPrimary,
                                        fontSize: SizeConfig.fontTextSmallSize,
                                        fontStyle: FontStyle.italic,
                                      ),
                                      textAlign: TextAlign.center,
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        GestureDetector(
                          onTap: () => Navigator.restorablePushNamed(
                            context,
                            MyCityView.routeName
                          ),
                          child: Card(
                            child: SizedBox(
                              height: (SizeConfig.screenWidth / 2) - (SizeConfig.padding * 2),
                              width: (SizeConfig.screenWidth / 2) - (SizeConfig.padding * 2),
                              child: Padding(
                                padding: EdgeInsets.all(
                                  SizeConfig.paddingSmall,
                                ),
                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: [
                                    Icon(
                                      Icons.book_outlined,
                                      size: SizeConfig.iconSizeLarge,
                                      color: Theme.of(context).colorScheme.onSurface,
                                    ),
                                    SizedBox(
                                      height: SizeConfig.paddingTiny,
                                    ),
                                    Text(
                                      'Ma ville',
                                      style: TextStyle(
                                        color: Theme.of(context).colorScheme.onPrimary,
                                        fontWeight: FontWeight.bold,
                                      ),
                                      textAlign: TextAlign.center,
                                    ),
                                    SizedBox(
                                      height: SizeConfig.paddingTiny,
                                    ),
                                    Text(
                                      'Information et histoire de ma ville',
                                      style: TextStyle(
                                        color: Theme.of(context).colorScheme.onPrimary,
                                        fontSize: SizeConfig.fontTextSmallSize,
                                        fontStyle: FontStyle.italic,
                                      ),
                                      textAlign: TextAlign.center,
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                        ),
                        GestureDetector(
                          onTap: () => Navigator.restorablePushNamed(
                            context,
                            AboutView.routeName
                          ),
                          child: Card(
                            child: SizedBox(
                              height: (SizeConfig.screenWidth / 2) - (SizeConfig.padding * 2),
                              width: (SizeConfig.screenWidth / 2) - (SizeConfig.padding * 2),
                              child: Padding(
                                padding: EdgeInsets.all(
                                  SizeConfig.paddingSmall,
                                ),
                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: [
                                    Icon(
                                      Icons.info_outline,
                                      size: SizeConfig.iconSizeLarge,
                                      color: Theme.of(context).colorScheme.onSurface,
                                    ),
                                    SizedBox(
                                      height: SizeConfig.paddingTiny,
                                    ),
                                    Text(
                                      'À propos',
                                      style: TextStyle(
                                        color: Theme.of(context).colorScheme.onPrimary,
                                        fontWeight: FontWeight.bold,
                                      ),
                                      textAlign: TextAlign.center,
                                    ),
                                    SizedBox(
                                      height: SizeConfig.paddingTiny,
                                    ),
                                    Text(
                                      'Rensignements divers autour de  votre aplication',
                                      style: TextStyle(
                                        color: Theme.of(context).colorScheme.onPrimary,
                                        fontSize: SizeConfig.fontTextSmallSize,
                                        fontStyle: FontStyle.italic,
                                      ),
                                      textAlign: TextAlign.center,
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              DropdownMenu<String>(
                initialSelection: selectedCity,
                label: Text(
                  AppLocalizations.of(context)!.startupHelpMyCityLabel,
                ),
                width: SizeConfig.screenWidth - (2 * SizeConfig.padding),
                onSelected: (String? value) {
                  setState(() {
                    selectedCity = value!;
                    widget.dataController.setUserMainCity(selectedCity);
                  });
                },
                dropdownMenuEntries: AppConst.cities.asMap().entries.map<DropdownMenuEntry<String>>((entry) {
                  return DropdownMenuEntry(
                    value: AppConst.citiesCode[entry.key],
                    label: entry.value,
                  );
                }).toList(),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

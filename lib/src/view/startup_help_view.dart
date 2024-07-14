import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

import '/src/data/data_controller.dart';
import '/src/utils/app_const.dart';
import '/src/utils/size_config.dart';
import '/src/view/menu_view.dart';
// Startup help view will display the user
// information about what the app does, and
// let him choose the main city to user
class StartupHelpView extends StatefulWidget {
  const StartupHelpView({
    super.key,
    required this.dataController,
  });

  static const routeName = '/startuphelp';
  final DataController dataController;

  @override
  StartupHelpViewState createState() {
    return StartupHelpViewState();
  }
}

class StartupHelpViewState extends State<StartupHelpView> {
  @override
  Widget build(
    BuildContext context,
  ) {
    SizeConfig().init(context);
    String selectedCity = widget.dataController.userMainCity;

    return Scaffold(
      appBar: AppBar(
        title: Text(
          AppLocalizations.of(context)!.startupHelpAppBarTitle,
        ),
        shadowColor: Theme.of(context).colorScheme.shadow,
      ),
      body: SingleChildScrollView(
        child: Container(
          padding: EdgeInsets.symmetric(
            horizontal: SizeConfig.padding,
            vertical: SizeConfig.paddingLarge,
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Image.asset(
                'assets/images/logo.png',
                fit: BoxFit.fitWidth,
                width: 128.0,
              ),
              SizedBox(
                height: SizeConfig.paddingLarge,
              ),
              Text(
                AppLocalizations.of(context)!.startupHelpCatchPhrase,
                style: TextStyle(
                  fontSize: SizeConfig.fontTextLargeSize,
                  fontWeight: FontWeight.w600,
                  color: Theme.of(context).colorScheme.onPrimary,
                ),
                textAlign: TextAlign.center,
              ),
              SizedBox(
                height: SizeConfig.padding,
              ),
              Text(
                AppLocalizations.of(context)!.startupHelpGeneralDescription,
                style: TextStyle(
                  color: Theme.of(context).colorScheme.onPrimary,
                  fontSize: SizeConfig.fontTextSize,
                ),
                textAlign: TextAlign.center,
              ),
              SizedBox(
                height: SizeConfig.padding,
              ),
              Text(
                AppLocalizations.of(context)!.startupHelpMakerInformation,
                style: TextStyle(
                  color: Theme.of(context).colorScheme.onPrimary,
                  fontSize: SizeConfig.fontTextSize,
                ),
                textAlign: TextAlign.center,
              ),
              SizedBox(
                height: SizeConfig.padding,
              ),
              Text(
                AppLocalizations.of(context)!.startupHelpChooseCity,
                style: TextStyle(
                  color: Theme.of(context).colorScheme.onPrimary,
                  fontSize: SizeConfig.fontTextSize,
                ),
                textAlign: TextAlign.center,
              ),
              SizedBox(
                height: SizeConfig.padding,
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
              SizedBox(
                height: SizeConfig.padding,
              ),
              ButtonTheme(
                height: (SizeConfig.defaultSize * 5),
                minWidth: MediaQuery.of(context).size.width,
                child: ElevatedButton(
                  onPressed: () => Navigator.popAndPushNamed(
                    context,
                    MenuView.routeName
                  ),
                  child: Text(
                    AppLocalizations.of(context)!.startupHelpSubmit,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

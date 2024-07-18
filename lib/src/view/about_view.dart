import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

import '/src/data/data_controller.dart';
import '/src/utils/size_config.dart';
// Provide users info on the app and its data
class AboutView extends StatelessWidget {
  const AboutView({
    super.key,
    required this.dataController,
  });

  static const routeName = '/about';
  final DataController dataController;

  @override
  Widget build(
    BuildContext context
  ) {
    SizeConfig().init(context);

    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.primary,
      appBar: AppBar(
        title: Text(
          AppLocalizations.of(context)!.aboutAppBarTitle,
        ),
        shadowColor: Theme.of(context).colorScheme.shadow,
      ),
      body: Text('OUI'),
      // App credits
      // Flutter / layer credits
      // Stadia/ORS credits
      // Logo Dourdan + CCDH colors
    );
  }
}

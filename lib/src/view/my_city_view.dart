import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

import '/src/data/data_controller.dart';
import '/src/utils/size_config.dart';

class MyCityView extends StatefulWidget {
  const MyCityView({
    super.key,
    required this.dataController,
  });

  static const routeName = '/mycity';
  final DataController dataController;

  @override
  MyCityViewState createState() {
    return MyCityViewState();
  }
}

class MyCityViewState extends State<MyCityView> {
  @override
  Widget build(
    BuildContext context,
  ) {
    SizeConfig().init(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(
          AppLocalizations.of(context)!.myCityAppBarTitle,
        ),
        shadowColor: Theme.of(context).colorScheme.shadow,
      ),
      body: Text('OUI'),
    );
  }
}

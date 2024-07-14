import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

import '/src/data/data_controller.dart';
import '/src/utils/size_config.dart';

class SearchView extends StatefulWidget {
  const SearchView({
    super.key,
    required this.dataController,
  });

  static const routeName = '/search';
  final DataController dataController;

  @override
  SearchViewState createState() {
    return SearchViewState();
  }
}

class SearchViewState extends State<SearchView> {
  @override
  Widget build(
    BuildContext context,
  ) {
    SizeConfig().init(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(
          AppLocalizations.of(context)!.searchAppBarTitle,
        ),
        shadowColor: Theme.of(context).colorScheme.shadow,
      ),
      body: Text('OUI'),
    );
  }
}

import 'package:flutter/material.dart';

import '/src/mondourdannais.dart';
import '/src/data/data_controller.dart';
import '/src/data/data_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  // Global app data controller
  final dataController = DataController(
    DataService(),
  );
  // Loading settings during splash screen
  await dataController.initAppData();
  // Finally start MonDourdannais app
  runApp(
    MonDourdannais(
      dataController: dataController,
    ),
  );
}

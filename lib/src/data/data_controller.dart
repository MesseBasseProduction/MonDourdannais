import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'data_service.dart';

import '/src/utils/app_const.dart';
// An abstract controller class for handling settings.
// This object may be given to views so they can get and set
// settings values.
class DataController with ChangeNotifier {
  DataController(
    this._dataService,
  );
  
  // Settings service to access device and secure storage
  final DataService _dataService;

  // App stored settings
  late ThemeMode _themeMode;
  late Locale _appLocale;
  late bool _startupHelpFlag;
  late String _userMainCity;
  // Map and marks utils
  final Map<String, List<dynamic>> _citiesBounds = {};
  final Map<String, dynamic> _citiesMarkers = {};

  // Data getters
  ThemeMode get themeMode => _themeMode;
  Locale get appLocale => _appLocale;
  bool get startupHelpFlag => _startupHelpFlag;
  String get userMainCity => _userMainCity;
  Map<String, List<dynamic>> get citiesBounds => _citiesBounds;
  Map<String, dynamic> get citiesMarkers => _citiesMarkers;

  // Load settings from storage. Required before loading app
  Future<void> initAppData() async {
    _themeMode = await _dataService.getThemeMode();
    _appLocale = await _dataService.getAppLocale();
    _startupHelpFlag = await _dataService.getStartupHelpFlag();
    _userMainCity = await _dataService.getUserMainCity();

    for (var i = 0; i < AppConst.citiesCode.length; ++i) {
      // Get cities boundaries from assets
      String rawJson = await rootBundle.loadString('assets/json/citybounds/${AppConst.citiesCode[i]}.json');
      var decoded = await json.decode(rawJson);
      _citiesBounds[AppConst.citiesCode[i]] = decoded['bounds'];
      // Then get cities markers from assets
      rawJson = await rootBundle.loadString('assets/json/citymarkers/${AppConst.citiesCode[i]}.json');
      decoded = await json.decode(rawJson);
      _citiesMarkers[AppConst.citiesCode[i]] = decoded['markers'];
    }

    notifyListeners();
  }

  /* App global settings setters */

  // Update app UI theme
  Future<void> setThemeMode(
    ThemeMode? newValue,
  ) async {
    if (newValue == null) return; // Avoid null exception
    if (newValue == _themeMode) return; // Avoid setting same value
    _themeMode = newValue; // Update controller value
    await _dataService.setThemeMode(_themeMode); // Save into storage
    notifyListeners();
  }
  // Update app locale
  Future<void> setAppLocale(
    Locale? newValue,
  ) async {
    if (newValue == null) return; // Avoid null exception
    if (newValue == _appLocale) return; // Avoid setting same value
    _appLocale = newValue; // Update controller value
    await _dataService.setAppLocale(_appLocale); // Save into storage
    notifyListeners();
  }
  // Update show help on startup
  Future<void> setStartupHelpFlag(
    bool newValue,
  ) async {
    if (newValue == _startupHelpFlag) return; // Avoid setting same value
    _startupHelpFlag = newValue; // Update controller value
    await _dataService.setStartupHelpFlag(_startupHelpFlag); // Save into storage
    notifyListeners();
  }
  // Update selected city
  Future<void> setUserMainCity(
    String? newValue,
  ) async {
    if (newValue == null) return; // Avoid null exception
    if (newValue == _userMainCity) return; // Avoid setting same value
    if (AppConst.citiesCode.contains(newValue) == false) return; // Avoid writing value not supported
    _userMainCity = newValue; // Update controller value
    await _dataService.setUserMainCity(_userMainCity); // Save into storage
    notifyListeners();
  }
}

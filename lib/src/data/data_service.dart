import 'dart:io';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '/src/utils/app_const.dart';
// The service responsible for saving preferences to
// the device shared preferences so they are persistent
// upon app restart.
class DataService {
  /* Data service getters */

  // Loads the user's preferred ThemeMode from device storage
  Future<ThemeMode> getThemeMode() async {
    final SharedPreferences appPreferences = await SharedPreferences.getInstance();
    // Read preference from device shared preference storage
    String? value = appPreferences.getString('md-theme-mode');
    if (value == 'dark') {
      await appPreferences.setString(
        'md-theme-mode',
        'dark',
      );
      return ThemeMode.dark;
    } else {
      // Default theme to dark mode
      await appPreferences.setString(
        'md-theme-mode',
        'light',
      );
      return ThemeMode.light;
    }
  }
  // Loads the user's preffered Locale from device storage
  Future<Locale> getAppLocale() async {
    final SharedPreferences appPreferences = await SharedPreferences.getInstance();
    // Read preference from device shared preference storage
    String? value = appPreferences.getString('md-app-locale');
    // First app start or preferences are empty
    if (value == null) {
      // Extract device locale
      String deviceLocale = Platform.localeName.substring(0, 2);
      if (AppConst.supportedLang.contains(value) == false) {
        // French locale by default, device locale not supported in app
        await appPreferences.setString(
          'md-app-locale',
          'fr',
        );
        return const Locale.fromSubtags(
          languageCode: 'fr',
        );
      } else {
        // Use device locale, set saved preference
        await appPreferences.setString(
          'md-app-locale',
          deviceLocale,
        );
        return Locale.fromSubtags(
          languageCode: deviceLocale,
        );
      }
    } else {
      // Retrun saved preference for locale
      return Locale.fromSubtags(
        languageCode: value,
      );
    }
  }
  // Wether to display the welcome screen poresentingbeercrackerz to the user
  Future<bool> getStartupHelpFlag() async {
    final SharedPreferences appPreferences = await SharedPreferences.getInstance();
    // Read preference from device shared preference storage
    bool? value = appPreferences.getBool('md-startup-help');
    // First app launch, set pref value to true and return true
    if (value == null) {
      await appPreferences.setBool(
        'md-startup-help',
        true,
      );
      return true;
    }
    // Return stored value
    return value;
  }
  // The user selected city
  Future<String> getUserMainCity() async {
    final SharedPreferences appPreferences = await SharedPreferences.getInstance();
    // Read preference from device shared preference storage
    String? value = appPreferences.getString('md-user-main-city');
    // First app launch, set pref value to 'BRX' and return it
    if (value == null) {
      await appPreferences.setString(
        'md-user-main-city',
        'BRX',
      );
      return 'BRX';
    }
    // Return stored value
    return value;
  }

  /* Data service setters */

  // Persists the user's preferred ThemeMode to device storage
  Future<void> setThemeMode(
    ThemeMode newValue,
  ) async {
    final SharedPreferences appPreferences = await SharedPreferences.getInstance();
    String value = 'light'; // Light theme by default
    if (newValue == ThemeMode.dark) {
      value = 'dark';
    }
    // Update stored app preferences
    await appPreferences.setString(
      'md-theme-mode',
      value,
    );
  }
  // Persists the user's preferred Locale to device storage
  Future<void> setAppLocale(
    Locale newValue,
  ) async {
    final SharedPreferences appPreferences = await SharedPreferences.getInstance();
    String value = 'fr'; // French locale by default
    switch (newValue.toString()) {
      case 'en':
        value = 'en';
      default:
        value = 'fr';
    }
    // Update stored app preferences
    await appPreferences.setString(
      'md-app-locale',
      value,
    );
  }
  // Update the saved preference to show the city selection on startup
  Future<void> setStartupHelpFlag(
    bool newValue,
  ) async {
    final SharedPreferences appPreferences = await SharedPreferences.getInstance();
    await appPreferences.setBool(
      'md-startup-help',
      newValue,
    );
  }
  // Persists the user's preferred city
  Future<void> setUserMainCity(
    String newValue,
  ) async {
    final SharedPreferences appPreferences = await SharedPreferences.getInstance();
    await appPreferences.setString(
      'md-user-main-city',
      newValue,
    );    
  }
}

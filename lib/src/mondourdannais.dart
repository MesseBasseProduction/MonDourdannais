import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

import 'package:loader_overlay/loader_overlay.dart';
import 'package:toastification/toastification.dart';

import '/src/data/data_controller.dart';
import '/src/utils/app_const.dart';
import '/src/utils/theme_config.dart';
import '/src/view/about_view.dart';
import '/src/view/map_explore_view.dart';
import '/src/view/menu_view.dart';
import '/src/view/my_city_view.dart';
import '/src/view/startup_help_view.dart';
import '/src/view/search_view.dart';
import '/src/view/settings_view.dart';

class MonDourdannais extends StatelessWidget {
  const MonDourdannais({
    super.key,
    required this.dataController,
  });
  // Global app settings controller
  final DataController dataController;
  // Main widget building
  @override
  Widget build(
    BuildContext context,
  ) {
    // Build supported locale from app constants
    List<Locale> supportedLocales = [];
    for (var locale in AppConst.supportedLang) {
      supportedLocales.add(
        Locale(locale, ''),
      );
    }
    // Then get Themes from configuration
    ThemeData darkTheme = ThemeConfig.darkTheme();
    ThemeData lightTheme = ThemeConfig.lightTheme();
    // MaterialApp encapsulated in loading overlay, itself encapsulated in Listenable for settings updates
    return ListenableBuilder(
      listenable: dataController,
      builder: (
        BuildContext context,
        Widget? child,
      ) {
        return GlobalLoaderOverlay(
          duration: const Duration(
            milliseconds: 250,
          ),
          reverseDuration: const Duration(
            milliseconds: 250,
          ),
          switchInCurve: Curves.bounceIn,
          switchOutCurve: Curves.bounceOut,
          useDefaultLoading: false,
          overlayWidgetBuilder: (_) {
            return Center(
              child: CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(darkTheme.colorScheme.primary),
              ),
            );
          },
          child: MaterialApp(
            debugShowCheckedModeBanner: false,
            restorationScopeId: 'app',
            localizationsDelegates: const [
              AppLocalizations.delegate,
              GlobalMaterialLocalizations.delegate,
              GlobalWidgetsLocalizations.delegate,
              GlobalCupertinoLocalizations.delegate,
            ],
            // App supported locale, based on AppConst.supportedLocales
            supportedLocales: supportedLocales,
            // Attach app locale to settings value
            locale: dataController.appLocale,
            onGenerateTitle: (BuildContext context) => AppLocalizations.of(context)!.appTitle,
            theme: lightTheme,
            darkTheme: darkTheme,
            // Attach app theme to settings value
            themeMode: dataController.themeMode,
            onGenerateRoute: (
              RouteSettings routeSettings,
            ) {
              return MaterialPageRoute<void>(
                settings: routeSettings,
                builder: (
                  BuildContext context,
                ) {
                  switch (routeSettings.name) {
                    case MenuView.routeName:
                      return MenuView(
                        dataController: dataController,
                      );
                    case MapExploreView.routeName:
                      return MapExploreView(
                        dataController: dataController,
                      );
                    case SearchView.routeName:
                      return SearchView(
                        dataController: dataController,
                      );
                    case MyCityView.routeName:
                      return MyCityView(
                        dataController: dataController,
                      );
                    case AboutView.routeName:
                      return AboutView(
                        dataController: dataController,
                      );
                    case SettingsView.routeName:
                      return SettingsView(
                        dataController: dataController,
                      );
                    default:
                      if (dataController.startupHelpFlag == true) {
                        return StartupHelpView(
                          dataController: dataController,
                        );
                      }
                      return MenuView(
                        dataController: dataController,
                      );
                  }
                },
              );
            },
            // Toast notification global configuration
            builder: (
              context,
              child,
            ) {
              return ToastificationConfigProvider(
                config: const ToastificationConfig(
                  alignment: Alignment.topCenter,
                  animationDuration: Duration(
                    milliseconds: 500,
                  ),
                ),
                child: child!,
              );
            },
          ),
        );
      },
    );
  }
}

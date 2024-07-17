import 'package:flutter_dotenv/flutter_dotenv.dart';

class AppConst {
  static String? osrApiKey = dotenv.env['OSR_API_KEY'];
  static String? stadiaMapsApiKey = dotenv.env['STADIA_MAPS_KEY'];
  static const int maxDistanceForRoute = 30000; // 30km max range to trace routes
  static const List<String> supportedLang = ['en', 'fr'];

  static const List<String> citiesCode = ['BRX', 'COR', 'DRD', 'LFR', 'LGR', 'RIC', 'ROV', 'SCD', 'SER', 'STC', 'VSG'];
  static const List<String> cities = [
    'Breux-Jouy',
    'Corbreuse',
    'Dourdan',
    'Les Forêts-le-Roi',
    'Les Granges-le-Roi',
    'Richarville',
    'Roinville-sous-Dourdan',
    'Saint-Cyr-sous-Dourdan',
    'Sermaise',
    'Saint-Chéron',
    'Val Saint-Germain',
  ];
}

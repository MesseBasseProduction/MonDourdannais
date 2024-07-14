class AppConst {
  // The server URL to reach, ensure no trailing slash remains
  static const String baseURL = 'https://beercrackerz.org';
  // Local assets to  be used on the map
  static const String spotImagePath = 'assets/images/marker/marker-icon-green.png';
  static const String shopImagePath = 'assets/images/marker/marker-icon-blue.png';
  static const String barImagePath = 'assets/images/marker/marker-icon-red.png';
  static const String wipMarkerImagePath = 'assets/images/marker/marker-icon-black.png';
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

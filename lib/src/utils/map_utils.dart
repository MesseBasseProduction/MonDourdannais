import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';

import '/src/view/fragment/marker_fragment_view.dart';

class MapUtils {
  // Perform an animation to destination Lat/Lng
  // to smoothen user navigation on map.
  static void animatedMapMove(
    LatLng destLocation,
    double destZoom,
    MapController mapController,
    TickerProvider tickerProvider,
  ) {
    final camera = mapController.camera;
    final latTween = Tween<double>(
      begin: camera.center.latitude,
      end: destLocation.latitude,
    );
    final lngTween = Tween<double>(
      begin: camera.center.longitude,
      end: destLocation.longitude,
    );
    final zoomTween = Tween<double>(
      begin: camera.zoom,
      end: destZoom,
    );
    final controller = AnimationController(
      duration: const Duration(
        milliseconds: 500,
      ),
      vsync: tickerProvider,
    );
    final Animation<double> animation = CurvedAnimation(
      parent: controller,
      curve: Curves.fastOutSlowIn,
    );
    final startIdWithTarget = 'AnimatedMapController#MoveStarted#${destLocation.latitude},${destLocation.longitude},$destZoom';
    bool hasTriggeredMove = false;

    controller.addListener(() {
      final String id;
      if (animation.value == 1.0) {
        id = 'AnimatedMapController#MoveFinished';
      } else if (!hasTriggeredMove) {
        id = startIdWithTarget;
      } else {
        id = 'AnimatedMapController#MoveInProgress';
      }

      hasTriggeredMove |= mapController.move(
        LatLng(latTween.evaluate(animation), lngTween.evaluate(animation)),
        zoomTween.evaluate(animation),
        id: id,
      );
    });

    animation.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        controller.dispose();
      } else if (status == AnimationStatus.dismissed) {
        controller.dispose();
      }
    });

    controller.forward();
  }

  static List<Polygon> buildCitiesBoundsAsPolygons(
    Map<String, List<dynamic>> input, 
  ) {
    List<Polygon> output = [];
    input.forEach((key, value) => output.add(
      MapUtils.buildCityBoundsAsPolygon(value),
    ));
    return output;
  }

  static Polygon buildCityBoundsAsPolygon(
    List<dynamic> pointList,
  ) {
    List<LatLng> points = [];
    for (var i = 0; i < pointList.length; ++i) {
      points.add(
        LatLng(
          pointList[i][0],
          pointList[i][1],
        ),
      );
    }
    return Polygon(
      points: points,
      borderStrokeWidth: 2,
      borderColor: Colors.blue.withOpacity(0.8),
      color: Colors.blue.withOpacity(0.1),
    );
  }

  static List<Marker> buildCitiesMarkers(
    BuildContext context,
    MapController mapController,
    TickerProvider tickerProvider,
    Function computeRouteToMark,
    Map<String, dynamic> input, 
  ) {
    List<Marker> output = [];
    // First forEach level is to iterate ovcer cities 
    input.forEach((key, city) {
      // Second iteration is all categories in a given city
      city.forEach((key, category) {
        // Third and last iteration is for markers in a category in a city
        for (var i = 0; i < category.length; ++i) {
          output.add(
            MarkerFragmentView.buildMarker(
              context,
              mapController,
              tickerProvider,
              computeRouteToMark,
              category[i],
            ),
          );
        }
      });
    });
    return output;
  }
}

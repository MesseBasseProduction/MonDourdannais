class MarkUtils {
  static bool isMarkOpened(
    Map<String, dynamic> input,
  ) {
    bool isMarkOpened = false;
    // Determine current mark opening state
    DateTime date = DateTime.now();
    // Marker is closed today
    if (input['timetable'] != null) {
      Map<String, dynamic> today = input['timetable'][date.weekday - 1];
      if (today['isOpen'] == false) {
        isMarkOpened = false;
      } else {
        double nowTime = date.hour + (date.minute / 60.0);
        double openTime = today['open']['h'] + (today['open']['m'] / 60.0);
        double closeTime = today['close']['h'] + (today['close']['m'] / 60.0);
        // No break caseù
        if (today['break'] == null) {
          if (nowTime >= openTime && nowTime < closeTime) {
            isMarkOpened = true;
          }
        } else { // Iterates breaks and check if time is ok
          double firstBreakStartTime = today['break'][0]['start']['h'] + (today['break'][0]['start']['m'] / 60.0);
          // First check if time is before first break
          if (nowTime >= openTime && nowTime < firstBreakStartTime) {
            isMarkOpened = true;
          } else {
            double firstBreakEndTime = today['break'][0]['end']['h'] + (today['break'][0]['end']['m'] / 60.0);
            // Only one break, checking time is after end break time
            if (today['break'].length == 1) {
              if (nowTime >= firstBreakEndTime && nowTime < closeTime) {
                isMarkOpened = true;
              }
            } else {
              // No need to test before first break as it was previously tested
              for (var i = 1; i < today['break'].length; ++i) {
                double previousBreakEndTime = today['break'][i - 1]['end']['h'] + (today['break'][i - 1]['end']['m'] / 60.0);
                double breakStartTime = today['break'][i]['start']['h'] + (today['break'][i]['start']['m'] / 60.0);
                if (nowTime >= previousBreakEndTime && nowTime < breakStartTime) {
                  isMarkOpened = true;
                  break;
                }
              }
              // Last case, testing if time is after last break and before closing hour
              if (isMarkOpened == false) {
                double lastBreakEndTime = today['break'][today['break'].length - 1]['end']['h'] + (today['break'][today['break'].length - 1]['end']['m'] / 60.0);
                if (nowTime >= lastBreakEndTime && nowTime < closeTime) {
                  isMarkOpened = true;
                }
              }
            }
          }
        }
      }
    } else if (input['alwaysOpened'] != null) {
      isMarkOpened = true;
    }
    return isMarkOpened;
  }
}

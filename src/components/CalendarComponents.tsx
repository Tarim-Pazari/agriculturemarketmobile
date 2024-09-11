import React, {useState, useEffect, useRef, memo} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Pressable,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import {Calendar, CalendarProvider, WeekCalendar} from 'react-native-calendars';
import {
  faAngleLeft,
  faAngleRight,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import CustomText from './Text/Text';
import AlertDialog from './AlertDialog/AlertDialog';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Input from './Input/Input';

interface CalendarComponentProps {
  search: string;
  setSearch: (text: string) => void;
  setSelectedDay: (date: string) => void;
  selectedDay: string;
  disabledOnPress?: boolean;
}

const CalendarComponent = (props: CalendarComponentProps) => {
  const {
    search,
    setSearch,
    selectedDay,
    setSelectedDay,
    disabledOnPress = false,
  } = props;
  const [calendarType, setCalendarType] = useState('week');
  const animatedHeight = useRef(
    new Animated.Value(Platform.OS === 'ios' ? 90 : 110),
  ).current;

  const toggleCalendarType = () => {
    const toValue =
      calendarType === 'week'
        ? Platform.OS === 'ios'
          ? 240
          : 240
        : Platform.OS === 'ios'
        ? 90
        : 110;

    Animated.timing(animatedHeight, {
      toValue,
      duration: 400,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start(() => {
      setCalendarType(calendarType === 'week' ? 'month' : 'week');
    });
  };

  return (
    <SafeAreaView style={{backgroundColor: '#1E8604'}}>
      <Animated.View style={{height: animatedHeight}}>
        {calendarType === 'week' && (
          <Pressable
            style={{marginTop: Platform.OS === 'android' ? 10 : 0}}
            onPress={toggleCalendarType}>
            <CustomText fontSizes="h5" center color="white">
              {dayjs(selectedDay).format('MMMM YYYY')}
            </CustomText>
          </Pressable>
        )}
        {calendarType === 'week' ? (
          <CalendarProvider
            onDateChanged={date => {
              setSelectedDay(date);
            }}
            date={selectedDay}>
            <WeekCalendar
              date={selectedDay}
              onDayPress={day => {
                if (disabledOnPress) return;
                console.log('a');
                let maxDate = dayjs().format('YYYY-MM-DD');
                let selectedDate = dayjs(day.dateString).format('YYYY-MM-DD');
                if (selectedDate > maxDate) {
                  AlertDialog.showModal({
                    title: 'Uyarı',
                    message: 'İleri tarih seçilemez.',
                  });
                  return;
                }
                setSelectedDay(day.dateString);
              }}
              firstDay={1}
              theme={{
                calendarBackground: 'transparent',
                backgroundColor: 'transparent',
                dayTextColor: '#fff',
                textSectionTitleColor: '#fff',
                selectedDayBackgroundColor: '#72B262',
              }}
            />
          </CalendarProvider>
        ) : (
          <Calendar
            initialDate={selectedDay}
            customHeader={(date: any) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#1E8604',
                    paddingHorizontal: 20,
                    marginTop: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      date.addMonth(-1);
                    }}>
                    <FontAwesomeIcon
                      icon={faAngleLeft}
                      color="white"
                      size={20}
                    />
                  </TouchableOpacity>
                  <Pressable onPress={toggleCalendarType}>
                    <CustomText fontSizes="h5" center color="white">
                      {dayjs(date.month).format('MMMM YYYY')}
                    </CustomText>
                  </Pressable>
                  <TouchableOpacity
                    onPress={() => {
                      date.addMonth(1);
                    }}>
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      color="white"
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
            dayComponent={(props: any) => {
              const {date, state} = props;
              let textColor = 'white';
              if (state === 'disabled') {
                textColor = 'grey';
              }
              return (
                <TouchableOpacity
                  onPress={() => {
                    let maxDate = dayjs().format('YYYY-MM-DD');
                    let selectedDate = dayjs(date.dateString).format(
                      'YYYY-MM-DD',
                    );
                    if (selectedDate > maxDate) {
                      AlertDialog.showModal({
                        title: 'Uyarı',
                        message: 'İleri tarih seçilemez.',
                      });
                      return;
                    }
                    setSelectedDay(date.dateString);
                  }}
                  style={{
                    backgroundColor:
                      date.dateString === selectedDay
                        ? '#72B262'
                        : 'transparent',
                    borderRadius: 10,
                    height: 30,
                    width: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CustomText center color={textColor as any}>
                    {date.day}
                  </CustomText>
                </TouchableOpacity>
              );
            }}
            theme={{
              calendarBackground: 'transparent',
              backgroundColor: 'transparent',
              dayTextColor: '#fff',
              selectedDayBackgroundColor: '#72B262',
              selectedDayTextColor: '#fff',
            }}
          />
        )}
      </Animated.View>
      <View
        style={{
          marginTop:
            Platform.OS === 'android' ? (calendarType !== 'week' ? 15 : 5) : 10,
          marginBottom: 7,
          marginHorizontal: 10,
        }}>
        <Input
          onFocus={() => {}}
          enableFocusBorder={false}
          autoFocus={false}
          style={{backgroundColor: '#fff'}}
          icon={faSearch}
          placeholder="Ürün Ara"
          onChangeText={text => setSearch(text)}
          value={search}
        />
      </View>
    </SafeAreaView>
  );
};

export default memo(CalendarComponent);

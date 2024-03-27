import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
} from 'react-native';
import { Switch } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { ClassData } from '../ClassManagement/Class/AddClass';
import { SelectList } from 'react-native-dropdown-select-list';
import TimePickerCustomSelector from '../../components/TimeSelector/TimePickerCustom';


export default function Time({navigation}) {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date()); 
  const [locationStartTime, setLocationStartTime] = useState(new Date());
  const [pick, setPick] = useState(true);
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const [openTimePickerLoc, setOpenTimePickerLoc] = useState(false);
  const [routeno, setRouteNo] = useState('');
  const [arrayClass, setArrClass] = useState(['2','ABC1234', 'ABC567']);
  const[stopName, setStopName] = useState('');
  const [studentCount, setStudentCount] = useState('');

  const [routeArr, setRouteArr] = useState([]);


  const [openTimePickerend, setOpenTimePickerEnd] = useState(false);

    const handleTimeChange = (event, selectedTime, setValue, value, setOpener) => {
        setOpener(false); // Close the time picker
        if (event.type === 'set') {
          // Update startTime if time is set
          setValue(selectedTime || value); // If selectedTime is undefined, keep the previous time
        }
      };

    const handleAddStop =()=>{
      if(stopName.length>1 && studentCount.length>=1 && locationStartTime){
        let a = routeArr;
        let time =  moment(locationStartTime).format('HH:mm');
        a.push({stopName, studentCount, time });
        console.log(a);
        setRouteArr(a);
        setStopName('');
        setStudentCount('');
      }
    }


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Vehicle Route</Text>
        <View style={{marginVertical:20}}>
              <SelectList 
                    setSelected={(val) => setRouteNo(val)} 
                    maxHeight={90}
                    search={false}
                    placeholder='Vehicle Route No.'
                    boxStyles={{borderColor:'#0470DC'}}
                    dropdownStyles={{borderColor:'#0470DC'}}
                    dropdownTextStyles={{color:"#000"}}
                    data={arrayClass} 
                    save="value"
                  />
        </View>
        <View style={{flexDirection:'row'}}>
            <View style={{ marginRight:40}}>
                <Text style={{...styles.infoText, color:'#000'}}>Start Time</Text>
                <TouchableOpacity
                    style={styles.info}
                    onPress={() => setOpenTimePicker(true)}>
                    <Text style={styles.infoText}>
                    {moment(startTime).format('HH:mm')}
                </Text>
                </TouchableOpacity>
                {openTimePicker && (
                    <DateTimePicker
                        value={startTime}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={(event, selectedTime)=>{
                          handleTimeChange(event, selectedTime,setStartTime, startTime, setOpenTimePicker)
                        }}                    
                    />
                )}
            </View>
            <View>
                <Text style={{...styles.infoText, color:'#000'}}>End time</Text>
                <TouchableOpacity
                    style={styles.info}
                    onPress={() => setOpenTimePickerEnd(true)}>
                    <Text style={styles.infoText}>
                    {moment(endTime).format('HH:mm')}
                </Text>
                </TouchableOpacity>
                {openTimePickerend && (
                    <DateTimePicker
                        value={endTime}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={(event, selectedTime)=>{
                          handleTimeChange(event, selectedTime,setEndTime, endTime, setOpenTimePickerEnd)
                        }}                    
                    />
                )}
            </View>
        </View>
        
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Pick up</Text>
          <Switch value={pick} onValueChange={setPick} />
          <Text style={styles.switchText}>Drop off</Text>
        </View>
                <ClassData
                    label="Stop Name"
                    value={stopName}
                    editable={true}
                    setValue={setStopName}
                />
                <ClassData
                    label="Student Count"
                    value={studentCount}
                    editable={true}
                    setValue={setStudentCount}
                />

        <View style={{ marginTop:20}}>
            <Text style={{...styles.infoText, color:'#000'}}>Location Start Time</Text>
                <View style={styles.infoLocation}>
                <TouchableOpacity
                    onPress={() => setOpenTimePickerLoc(true)}>
                    <Text style={styles.infoText}>
                    {moment(locationStartTime).format('HH:mm')}
                </Text>
                </TouchableOpacity>
                {openTimePickerLoc && (
                    <DateTimePicker
                        value={locationStartTime}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={(event, selectedTime)=>{
                          handleTimeChange(event, selectedTime,setLocationStartTime, locationStartTime, setOpenTimePickerLoc)
                        }}
                    />
                )}
                </View>
            
        </View>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => {
            // Handle submit logic here
            handleAddStop();
          }}>
          <Text style={{...styles.buttonText, color:'#fff'}}>Add stop info</Text>
        </TouchableOpacity>

        {routeArr.length>0 && <View style={styles.tableContainer}>
          <Text style={styles.tableHeaderText}>Route Information</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Stop Name</Text>
              <Text style={styles.tableHeader}>Student Count</Text>
              <Text style={styles.tableHeader}>Stop Time</Text>
            </View>
            {routeArr.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.tableData}>{item.stopName}</Text>
                <Text style={styles.tableData}>{item.studentCount}</Text>
                <Text style={styles.tableData}>{item.time}</Text>
              </View>
            ))}
          </View>
        </View>}



        <TouchableOpacity
          style={styles.createButton}
          onPress={() => {
            // Handle submit logic here
          }}>
          <Text style={{...styles.buttonText, color:'#fff'}}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => {
            navigation.navigate('FacilityDashboard');
          }}>
          <Text style={{...styles.buttonText, color:'#f00'}}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '800',
    color: '#000',
    fontFamily: 'sans-serif',
    marginBottom: 12,
    fontSize: 20,
  },
  info: {
    borderWidth: 1,
    borderColor: '#0470DC',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  
  infoLocation: {
    alignContent:"center",
    width: 350,
    borderRadius:15,
    height: 60,
    borderWidth: 1,
    borderColor: "#0470DC",
    paddingHorizontal:12,
    marginTop:10,
    justifyContent: "center",
  },
  infoText: {
    fontFamily: 'Lexend-Regular',
    fontSize: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchText: {
    marginHorizontal: 10,
  },
  createButton : {
    width: 350,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0470DC",
    height: 50,
    borderRadius: 15
  },
  cancelButton : {
    width: 350,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#f00",
    borderWidth:1,
    color:'#f00',
    height: 50,
    borderRadius: 15,
    marginBottom:17
  },
  buttonText: {
    fontWeight: 'bold',
  },
  tableContainer: {
    marginTop: 20,
    borderColor: '#383838',
    width: 350 ,
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },
  tableHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    padding: 10,
    alignSelf:'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color:'#282828'
  },
  table: {
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color:'#282828'
  },
  tableData: {
    flex: 1,
    fontSize: 16,
    color:'#282828'
  },
});
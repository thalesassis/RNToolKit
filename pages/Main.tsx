import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import TopBar from '../shared/TopBar';
import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';



class Main extends Component {
  
  state = {
    permissions: [{
      key: "camera_permission",
      title: 'Camera',
      permission: '',
      permissionName: PERMISSIONS.ANDROID.CAMERA
    },{
      key: "map_permission",
      title: 'Map',
      permission: '',
      permissionName: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    }]
  };
  
  async checkPermission(permission:any) {
    return await check(permission).then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE: 
            return "Unavailable";
            break;
          case RESULTS.DENIED:
            return "Denied";
            break;
          case RESULTS.GRANTED:
            return "Granted";
            break; 
          case RESULTS.BLOCKED: 
            return "Blocked";
            break;
      }
    })
  }

  async checkAllPermissions() {
    const permissions = this.state.permissions;
    let newPermissions:any = [];
    permissions.map(async (item,index) => { 
      let result = await this.checkPermission(item.permissionName);
      newPermissions[index] = item;
      item.permission = result;
      this.setState({ permissions: newPermissions });
    });
  }

  async askPermission(permissions:any, index:number) {
    request(permissions[index].permissionName).then(result => {
      this.checkAllPermissions();
      let next = index + 1;
      if(permissions[next] != undefined) {  
        this.askPermission(permissions,next);  
      }
    });
  }

  async askAllPermissions() {
    const permissions = this.state.permissions;
    this.askPermission(permissions, 0);
  }
  
  componentDidMount () {
    this.askAllPermissions();
  }

  

  render() {
    return (
      <> 
      {this.state.permissions.map((item) => (
        <View key={item.key} style={styles.listItem}>
          <View style={styles.textContainer}>
            <Text style={styles.listTextLeft}>{item.title}</Text>
            <Text style={styles.listTextRight}>{item.permission}</Text>
          </View>
        </View>
      )
      )}
      </>
    );
  }
}

const Stack = createStackNavigator();
export default class MainScreen extends Component {
  render() {
    return (
      <>
        <Stack.Navigator>
          <Stack.Screen name="Permissions" component={Main} />
        </Stack.Navigator>
      </>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'column'
  },
  textContainer: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15
  },
  listTextLeft: {
    fontSize: 23,
    flex: 1,
    alignContent: 'flex-end',
  },
  listTextRight: {
    fontSize: 23,
    flex: 1,
    alignContent: 'flex-end',
    textAlign: 'right'
  }
});
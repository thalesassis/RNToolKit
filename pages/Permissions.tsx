import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, Button, TextInput, Alert, Dimensions } from 'react-native';
import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import { GlobalState } from '../shared/GlobalState';


export default class Permissions extends Component {  
  
  static contextType = GlobalState;
  state = {
    name: "",
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

  nav:any;

  constructor(props:any) {
    super(props);
    this.nav = props.navigation;
  }
  
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

  isAllGranted() {
    let isAllGranted = true;
    this.state.permissions.map((item,index) => { 
      if(item.permission != "Granted") {
        isAllGranted = false;
      }  
    });
    return isAllGranted;
  }
  
  componentDidMount() {
    this.askAllPermissions();
  }

  handleName(text:string) {
    this.setState({name: text});
  }

  render() {
    return (
      <> 
      <View style={styles.mainContainer}>

        <ScrollView style={styles.listContainer}>
          {this.state.permissions.map((item, i) => (
            <View key={item.key} style={styles.listItem}>
              <View  style={(i === (this.state.permissions.length - 1)) ? styles.textContainer_last : styles.textContainer}>
                <Text style={styles.listTextLeft}>{item.title}</Text>
                <Text style={styles.listTextRight}>{item.permission}</Text>
              </View>
            </View>
          )
          )}
        </ScrollView>

        <View style={styles.button}>
        <TextInput
          style={styles.textInput}
          placeholder="Your Name"
          onChangeText={text => this.handleName(text)}
          value={this.state.name}
        />

        <Button 
          disabled={!this.isAllGranted() || this.state.name.length == 0}
          title="Start App" 
          onPress={() => { 
            this.context.setState({myName: this.state.name});
            this.nav.replace('Home');
          }}
        />
        </View>  

      </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  textInput: {
    padding: 10,
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    marginBottom: 10,
  },
  button: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15
  }, 
  listContainer: {
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get('window').height - 200,
    position: 'absolute'
  },
  listItem: {
    flexDirection: 'column'
  },
  textContainer: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1
  }, 
  textContainer_last: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0
  },
  listTextLeft: {
    fontSize: 18,
    flex: 1,
    alignContent: 'flex-end',
  },
  listTextRight: {
    fontSize: 18,
    flex: 1,
    alignContent: 'flex-end',
    textAlign: 'right'
  }
});
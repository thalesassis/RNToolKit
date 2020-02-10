import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class TopBar extends Component {
    
    render() {
        return (
        <View style={styles.topBar}> 
            <Icon 
                onPress={()=>this.props.nav.toggleDrawer()}
                name='bars'
                size={30}
                color='#000000'
                />
        </View>
        );
    }
}

const styles = StyleSheet.create({
  topBar: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: '#FFFFFF'
  }
});

export default TopBar;
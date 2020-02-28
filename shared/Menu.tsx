import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuDrawer from 'react-native-side-drawer';
import { MyContext } from '../App';

class Menu extends Component {
  constructor(props:any) { 
    super(props);
  }

    
  state = {
    open: true
  }

  
  drawerContent = () => {
    return (
      <MyContext.Consumer>
        {context => (
        <TouchableOpacity onPress={() => this.setState({ open: context.toggleMenu(!context.toggleMenu) })} style={styles.animatedBox}>
          <Text>Close</Text>
        </TouchableOpacity>
        )}
      </MyContext.Consumer>
    );
  };
  
  componentDidMount() {   
    this.setState({ open: true });
  }
  
  render() {
      return (
      <MyContext.Consumer> 
        {context => (
        <>
        <Text>{context.menu.open}</Text>
        <MenuDrawer 
          open={context.menu.open} 
          drawerContent={this.drawerContent()}
          drawerPercentage={45}
          animationTime={250}
          overlay={true}
          opacity={0.4}
        >
        </MenuDrawer>
        </>
        )}
      </MyContext.Consumer>
      );
  }
}

const styles = StyleSheet.create({
  Menu: {
    position: 'absolute',
    top: 0,
    right: 10,
    zIndex: 1,
    backgroundColor: '#FFFFFF'
  },
  animatedBox: {
    flex: 1,
    marginTop: -4,
    backgroundColor: "#38C8EC",
  }
});

export default Menu;
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuDrawer from 'react-native-side-drawer';
import { MyContext } from '../App';

class Menu extends Component {
  nav:any;
  constructor(props:any) { 
    super(props);
    this.nav = props.nav;
  }
    
  state = {
    menuList: [{
      name: "Home"
    },
    {
      name: "Map"
    }]
  }

  
  drawerContent = () => {
    return (
      <>
      <TouchableOpacity onPress={() => this.setState({ open: this.context.toggleMenu(!this.context.toggleMenu) })} style={styles.animatedBox}>
        <Text>Close</Text>
      </TouchableOpacity>
      <ScrollView style={styles.listContainer}>
        {this.state.menuList.map((item, i) => (
          <View key={item.id} style={styles.listItem}>
            <View  style={(i === (this.state.menuList.length - 1)) ? styles.textContainer_last : styles.textContainer}>
              <Text onPress={() => { this.setState({ open: this.context.toggleMenu(!this.context.toggleMenu)}); this.nav.replace(item.name) } } style={styles.listTextLeft}>{item.name}</Text>
            </View>
          </View>
        )
        )}
        </ScrollView>
      </>
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
        <View style={styles.openButton}>
          <Icon 
          onPress={() => this.setState({ open: context.toggleMenu(!context.menu.open) })}
          name='bars'
          size={30}
          color='#000000'
          />
        </View>
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
Menu.contextType = MyContext;

const styles = StyleSheet.create({
  openButton: {
    flex: 1,
    top: -43,
    right: 10,
    zIndex: 5,
    position: 'absolute'
  },
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

export default Menu;
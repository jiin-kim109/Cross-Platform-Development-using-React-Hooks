import React, { Component } from 'react';
import { registerRootComponent } from 'expo';
import { Provider } from 'mobx-react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './components/HomeScreen';
import TutorialScreen from './components/landing/TutorialScreen';

import RootStore from '../../common/src/store/RootStore';

interface State {}

interface Props {}

// Set prop types for each route
// undefine means the route has no param
// union (e.g. param | undefined) means that the params are optional
export type RootStackParamList = { 
    Tutorial: undefined
    Home: undefined
};

const Stack = createStackNavigator<RootStackParamList>();
class App extends Component<Props, State> {
    private rootStore: RootStore;

    constructor(props: Props) {
        super(props);
        this.rootStore = new RootStore();
    }
    render() {
        return (
            <Provider rootStore={this.rootStore}>
                <NavigationContainer>
                        <Stack.Navigator initialRouteName="Tutorial">
                            <Stack.Screen 
                                name="Tutorial"
                                component={TutorialScreen} 
                            />
                            <Stack.Screen 
                                name="Home" 
                                component={HomeScreen}
                            />
                        </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        );
    }
}

export default registerRootComponent(App);

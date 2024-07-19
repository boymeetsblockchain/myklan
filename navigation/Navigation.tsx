import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login'
import Register from '../screens/Register';

const Stack = createStackNavigator();


function Navigation (){
    return(
        <Stack.Navigator>
             
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    )
}


export default Navigation
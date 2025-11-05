import React from 'react';
import {StatusBar, LogBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {store} from '@store/store';
import RootNavigator from '@navigation/RootNavigator';
import {ThemeProvider} from '@theme/ThemeContext';

// Ignore specific warnings if needed
LogBox.ignoreLogs(['Warning: ...']);

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <ThemeProvider>
          <SafeAreaProvider>
            <StatusBar barStyle="dark-content" />
            <RootNavigator />
          </SafeAreaProvider>
        </ThemeProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;

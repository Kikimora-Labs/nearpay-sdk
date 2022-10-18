import {useState} from 'react';

import {Box, Flex, Heading} from '@chakra-ui/react';
import {EnvironmentMode, WidgetParams} from '@nearpay/nearpay-sdk';

import {FormWidget, NearPayWidget} from './components';

function App() {
  const [widgetEnvironment, setWidgetEnvironment] =
    useState<EnvironmentMode>('development');
  const [widgetParams, setWidgetParams] = useState<WidgetParams>({});

  function updateWidget(env: EnvironmentMode, params: WidgetParams) {
    setWidgetEnvironment(env);
    setWidgetParams(params);
  }

  return (
    <Box bg="#f8f9fa">
      <Heading size="md" textAlign="center" mb={6} p={4}>
        This page is a demonstration example how to setup NearPaySDK to connect
        on your web-page
      </Heading>
      <Flex
        gap={10}
        justifyContent="space-evenly"
        alignContent="center"
        wrap="wrap"
      >
        <Box flexGrow={4} maxWidth="600">
          <FormWidget debounceUpdate={updateWidget} />
        </Box>
        <Box flexGrow={3} maxWidth="400">
          <NearPayWidget
            environment={widgetEnvironment}
            params={widgetParams}
          />
        </Box>
      </Flex>
    </Box>
  );
}

export default App;

import {ChangeEvent, useEffect, useRef} from 'react';

import {QuestionIcon} from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Link,
  Select,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import {EnvironmentMode, WidgetParams} from '@nearpay/nearpay-sdk';

import {useDebounce, usePersistentStorage} from '../../hooks';

const formWidgetParams: WidgetParams = {
  apiKey: '',
  toCurrency: 'NEAR',
  toAmount: '10.5',
  toWallet: '',
  contractCall: {
    method: '',
    args: {'': ''},
  },
};

type FormInitialState = {
  [key in EnvironmentMode]: WidgetParams;
};

const formInitialState: FormInitialState = {
  development: formWidgetParams,
  stage: formWidgetParams,
  production: formWidgetParams,
};

export interface FormWidgetProps {
  debounceUpdate: (environment: EnvironmentMode, params: WidgetParams) => void;
}

export const FormWidget = ({debounceUpdate}: FormWidgetProps) => {
  const [formValues, setFormValues] = usePersistentStorage(
    'widget-form',
    formInitialState,
  );
  const debouncedFormValues = useDebounce(formValues, 1500);
  const [environmentMode, setEnvironmentMode] =
    usePersistentStorage<EnvironmentMode>('widget-environment', 'development');

  const formRef = useRef(null);
  const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value: string = e.target.value;

    if (name !== 'environment') {
      const params = {...formValues[environmentMode]};
      switch (name) {
        case 'contractCall.method':
          setFormValues({
            ...formValues,
            [environmentMode]: {
              ...formValues[environmentMode],
              contractCall: {
                ...formValues[environmentMode]!.contractCall,
                method: value,
              },
            },
          });
          break;
        case 'contractCall.args':
          setFormValues({
            ...formValues,
            [environmentMode]: {
              ...formValues[environmentMode],
              contractCall: {
                ...formValues[environmentMode]!.contractCall,
                args:
                  typeof value === 'object'
                    ? JSON.stringify(value, null, 4)
                    : String(value),
              },
            },
          });
          break;

        default:
          setFormValues({
            ...formValues,
            [environmentMode]: {...formValues[environmentMode], [name]: value},
          });

          break;
      }
    }
  };

  useEffect(() => {
    debounceUpdate(environmentMode, debouncedFormValues[environmentMode]);
  }, [environmentMode, debouncedFormValues]);

  return (
    <Box
      p={6}
      pb={8}
      border="1px"
      borderRadius={12}
      borderColor="gray.200"
      shadow="base"
      bg="white"
    >
      <FormControl as="fieldset" onChange={handleForm} ref={formRef}>
        <Box pt={2} pb={6}>
          <Select
            name="environment"
            value={environmentMode}
            onChange={(select) => {
              setEnvironmentMode(select.target.value as EnvironmentMode);
            }}
            size="xs"
            maxWidth={200}
            mx="auto"
          >
            <option value="development">Development</option>
            <option value="stage">Stage</option>
            <option value="production">Production</option>
          </Select>
        </Box>
        <Stack spacing={5}>
          <InputGroup size="md" minWidth={400}>
            <InputLeftAddon children="API" rounded="xl" />
            <Input
              name="apiKey"
              value={formValues[environmentMode]?.apiKey ?? ''}
              onChange={() => {}}
              isRequired={true}
              isInvalid={!formValues[environmentMode]?.apiKey}
              errorBorderColor="red.300"
              placeholder="a0b89bf1-00c7-4574-9450-0f9812eaf649"
              rounded="xl"
            />
          </InputGroup>

          <InputGroup size="sm" w={250}>
            <InputLeftAddon children="toCurrency" rounded="md" />
            <Input
              name="toCurrency"
              value={formValues[environmentMode]?.toCurrency ?? ''}
              onChange={() => {}}
              placeholder="NEAR, BTC, ETH"
              rounded="md"
            />
          </InputGroup>
          <InputGroup size="sm" w={250}>
            <InputLeftAddon children="toAmount" rounded="md" />
            <Input
              name="toAmount"
              value={formValues[environmentMode]?.toAmount ?? ''}
              onChange={() => {}}
              type="number"
              placeholder="10.50, 250, 0.041234"
              rounded="md"
            />
          </InputGroup>
          <InputGroup size="sm">
            <InputLeftAddon children="toWallet" rounded="md" />
            <Input
              name="toWallet"
              value={formValues[environmentMode]?.toWallet ?? ''}
              onChange={() => {}}
              placeholder="userwallet.near, 0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B"
              rounded="md"
            />
          </InputGroup>
          <InputGroup size="sm">
            <InputLeftAddon children="merchantOrderId" rounded="md" />
            <Input
              name="merchantOrderId"
              value={formValues[environmentMode]?.merchantOrderId ?? ''}
              onChange={() => {}}
              placeholder="84864f36-de90-4a4a-9f3f-0aab72fad082, 73400a4a, 123456"
              rounded="md"
            />
          </InputGroup>
          <InputGroup size="sm">
            <InputLeftAddon children="contractCall.method" rounded="md" />
            <Input
              name="contractCall.method"
              value={formValues[environmentMode]!.contractCall!.method}
              onChange={() => {}}
              placeholder="test1234"
              rounded="md"
            />
            <HStack ml={4}>
              <Link
                color="dark"
                href="https://kikimora-labs.notion.site/Dev-Documentation-SDKs-for-Merchants-fbf29ddaf92d4ea190ad92aef4d90474#71d97ab235fe4a1cb15abec02d39359b"
                target="_blank"
              >
                <QuestionIcon />
              </Link>
            </HStack>
          </InputGroup>
          <InputGroup size="sm">
            <InputLeftAddon children="contractCall.args" rounded="md" />
            <Textarea
              name="contractCall.args"
              value={
                typeof formValues[environmentMode]!.contractCall!.args ===
                'object'
                  ? JSON.stringify(
                      formValues[environmentMode]!.contractCall!.args,
                      null,
                      4,
                    )
                  : String(formValues[environmentMode]!.contractCall!.args)
              }
              onChange={() => {}}
              minHeight={100}
              placeholder={JSON.stringify({
                arg1: 'test1',
                arg2: 'test2',
              })}
              rounded="md"
            />
            <HStack ml={4}>
              <Link
                color="dark"
                href="https://kikimora-labs.notion.site/Dev-Documentation-SDKs-for-Merchants-fbf29ddaf92d4ea190ad92aef4d90474#71d97ab235fe4a1cb15abec02d39359b"
                target="_blank"
              >
                <QuestionIcon />
              </Link>
            </HStack>
          </InputGroup>
        </Stack>
      </FormControl>
      {/* <HStack
        spacing={6}
        direction="row"
        align="center"
        justify="end"
        mt={6}
        pr={8}
      >
        <Button
          bg="#0B293D"
          color="whiteAlpha.900"
          _hover={{bg: '#0E3650'}}
          minWidth={10}
          p={4}
          fontSize="sm"
          height={10}
          rounded="xl"
          rightIcon={<CheckIcon boxSize={4} />}
          onClick={() => {}}
        >
          Apply
        </Button>
      </HStack> */}
    </Box>
  );
};

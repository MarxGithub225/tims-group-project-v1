import PropTypes from 'prop-types';
import React, { Component } from "react";
import ReactNative, {
  NativeModules,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import {ViewPropTypes} from 'deprecated-react-native-prop-types'
import { danger, deviceWith, grey } from '../../../assets/styles/variables';

import CreditCard from "./CardView";
import CCInput from "./CCInput";
import { InjectedProps } from "./connectToState";

const s = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  form: {
    width : '100%',
    marginTop: 20,
  },
  inputContainer: {
  },
  inputLabel: {
    paddingVertical: 10,
    fontSize: 18,
    fontFamily: 'Inter'
  },
  input: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});

const CVC_INPUT_WIDTH = 70;
const EXPIRY_INPUT_WIDTH = CVC_INPUT_WIDTH;
const CARD_NUMBER_INPUT_WIDTH_OFFSET = 40;
const CARD_NUMBER_INPUT_WIDTH = '100%';
const NAME_INPUT_WIDTH = CARD_NUMBER_INPUT_WIDTH;
const PREVIOUS_FIELD_OFFSET = 40;
const POSTAL_CODE_INPUT_WIDTH = 120;

/* eslint react/prop-types: 0 */ // https://github.com/yannickcr/eslint-plugin-react/issues/106
export default class CreditCardInput extends Component {
  

  componentDidMount = () => this._focus(this.props.focused);

  UNSAFE_componentWillReceiveProps = newProps => {
    if (this.props.focused !== newProps.focused) this._focus(newProps.focused);
  };

  _focus = field => {
    if (!field) return;

    const scrollResponder = this.refs.Form.getScrollResponder();
    const nodeHandle = ReactNative.findNodeHandle(this.refs[field]);

    NativeModules.UIManager.measureLayoutRelativeToParent(nodeHandle,
      e => { throw e; },
      x => {
        scrollResponder.scrollTo({ x: Math.max(x - PREVIOUS_FIELD_OFFSET, 0), animated: true });
        this.refs[field].focus();
      });
  }

  _inputProps = field => {
    const {
      inputStyle, labelStyle, validColor, invalidColor, placeholderColor,
      placeholders, labels, values, status,
      onFocus, onChange, onBecomeEmpty, onBecomeValid,
    } = this.props;

    return {
      inputStyle: [s.input, inputStyle],
      labelStyle: [s.inputLabel, labelStyle],
      validColor, invalidColor, placeholderColor,
      ref: field, field,

      label: labels[field],
      placeholder: placeholders[field],
      value: values[field],
      status: status[field],

      onFocus, onChange, onBecomeEmpty, onBecomeValid,
    };
  };

  render() {
    const {
      cardImageFront, cardImageBack, inputContainerStyle,
      values, focused, defaultValue,
      requiresName, requiresCVC, requiresPostalCode, showInput,
      cardScale, cardFontFamily, clickable
    } = this.props;

    
     const  {number, name, expiry, cvc, type}  =  defaultValue ?? values

    return (
      <View style={s.container}>
        <CreditCard focused={focused}
            clickable = {clickable}
            brand={type}
            scale={cardScale}
            fontFamily={cardFontFamily}
            imageFront={cardImageFront}
            imageBack={cardImageBack}
            name={requiresName ? name : " "}
            number={number}
            expiry={expiry}
            cvc={cvc} />
        {showInput && <ScrollView ref="Form"
            horizontal={false}
            keyboardShouldPersistTaps="always"
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            style={s.form}>
               { requiresName &&
            <CCInput {...this._inputProps("name")}
                keyboardType="default"
                containerStyle={[s.inputContainer, inputContainerStyle,{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', width: CARD_NUMBER_INPUT_WIDTH }]} /> }
                
          <CCInput {...this._inputProps("number")}
              containerStyle={[s.inputContainer, inputContainerStyle, { flex: 1, flexDirection: 'column', justifyContent: 'space-between', width: CARD_NUMBER_INPUT_WIDTH }]} />
         <View
         style = {{
           flexDirection : 'row',
           justifyContent : 'space-between'
         }}
         >
          <CCInput {...this._inputProps("expiry")}
                containerStyle={[s.inputContainer,  inputContainerStyle,{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', width: deviceWith/2.3 }]} />
          { requiresCVC &&
            <CCInput {...this._inputProps("cvc")}
                containerStyle={[s.inputContainer, inputContainerStyle,{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', width: deviceWith/2.3 }]} /> }
         </View>
         
          { requiresPostalCode &&
            <CCInput {...this._inputProps("postalCode")}
                containerStyle={[s.inputContainer, inputContainerStyle, { flex: 1, flexDirection: 'column', justifyContent: 'space-between', width: CARD_NUMBER_INPUT_WIDTH }]} /> }
        </ScrollView>}
      </View>
    );
  }
}

CreditCardInput.defaultProps = {
  cardViewSize: {},
  labels: {
    name: "Cardholder's name",
    number: "Card Number",
    expiry: "Expiry",
    cvc: "CVC",
    postalCode: "Postal Code",
  },
  placeholders: {
    name: "Full Name",
    number: "1234 5678 1234 5678",
    expiry: "MM/YY",
    cvc: "CVC",
    postalCode: "34567",
  },
  inputContainerStyle: {
  },
  validColor: "",
  invalidColor: danger,
  placeholderColor: grey,
};

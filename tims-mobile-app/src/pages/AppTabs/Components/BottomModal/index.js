import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { black, blackLight, grey, greyLight, white } from '../../../../../assets/styles/variables';
import Filter from '../../Pages/Filter';
import RateForm from '../RateForm';

export default class BottomModal extends React.Component {
   constructor (props) {
       super(props)
   }

   modal = React.createRef();

  renderContent = () => {
    return (
      <View style={s.content}>
        <Text style={s.content__subheading}>{'Last step'.toUpperCase()}</Text>
        <Text style={s.content__heading}>Send the message?</Text>
        <Text style={s.content__description}>okkkkkk</Text>
        <TextInput style={s.content__input} placeholder="Type your username" />

        <TouchableOpacity style={s.content__button} activeOpacity={0.9} onPress={this.closeModal}>
          <Text style={s.content__buttonText}>{'Send'.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  openModal = () => {
    if (this.modal.current) {
      this.modal.current.open();
    }
  };

  closeModal = () => {
    if (this.modal.current) {
      this.modal.current.close();
    }
  };

  render() {
    return (
      <Modalize ref={this.modal} adjustToContentHeight closeOnOverlayTap = {false}>
        {this.props.type === 'rateForm' ? <RateForm navigation={this.closeModal} /> : 
        this.props.type === 'filter' ?
        <Filter navigation={this.closeModal} />
        :<Text> None</Text>}
      </Modalize>
    );
  }
}

const s = StyleSheet.create({
  content: {
    padding: 20,
  },

  content__icon: {
    width: 32,
    height: 32,

    marginBottom: 20,
  },

  content__subheading: {
    marginBottom: 2,

    fontSize: 16,
    fontWeight: '600',
    color: grey,
  },

  content__heading: {
    fontSize: 24,
    fontWeight: '600',
    color: black,
  },

  content__description: {
    paddingTop: 10,
    paddingBottom: 10,

    fontSize: 15,
    fontWeight: '200',
    lineHeight: 22,
    color: blackLight,
  },

  content__input: {
    paddingVertical: 15,
    marginBottom: 20,

    width: '100%',

    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: greyLight,
    borderRadius: 6,
  },

  content__button: {
    paddingVertical: 15,

    width: '100%',

    backgroundColor: black,
    borderRadius: 6,
  },

  content__buttonText: {
    color: white,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
});

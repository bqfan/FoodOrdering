import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import Button from '@/components/Button';
import { defaultPizzaImage } from '@/components/ProductListItem';
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from 'expo-router';

const CreateProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const { id } = useLocalSearchParams();
    const isUpdating = !!id;

    const resetFields = () => {
        setName('');
        setPrice('');
    }

    const validateInput = () => {
        setErrors('');

        if(!name) {
            setErrors('Name is required!');
            return false;
        }
    
        if(!price) {
            setErrors('Price is required!');
            return false;
        }

        if (isNaN(parseFloat(price))) {
            setErrors('Price is not a number!');
            return false;            
        }

        return true;
    }

    const onSubmit = () => {
        if(isUpdating) {
            onUpdate();
        } else {
            onCreate();
        }
    }

    const onCreate = () => {
        if (!validateInput()) {
            return;
        }

        console.warn("Creating product: ", name);
        // Save in database

        resetFields();
    }

    const onUpdate = () => {
        if (!validateInput()) {
            return;
        }

        console.warn("Updating product: ", name);
        // Save in database

        resetFields();
    }

    const onDelete = () => {
        console.warn("DELETE!!!");
    }

    const confirmDelete = () => {
        Alert.alert("Confirm", "Are you sure you want to delete this product?", [
            {
                text: 'Cancel',
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: onDelete,
            },
        ]);
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: isUpdating ? 'Update Product' : 'Create Product' }} />
      <Image source={{ uri: image || defaultPizzaImage }} style={styles.image} />
      <Text style={styles.textButton} onPress={pickImage}>Select image</Text>
      <Text style={styles.label}>create</Text>
      <TextInput
        placeholder="name"
        value={name}
        onChangeText={setName}
        style={styles.input} />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        placeholder="9.99"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        keyboardType='numeric' />

        <Text style={{ color: 'red' }}>{errors}</Text>
        <Button text={isUpdating ? 'Update' : 'Create'} onPress={onSubmit} />
        {isUpdating && <Text onPress={confirmDelete} style={styles.textButton}>Delete</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center'
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    },
    label: {
        color: 'gray',
        fontSize: 16,
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    }
});

export default CreateProductScreen
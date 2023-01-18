import React, { useState, useEffect, useCallback } from 'react'
import { Text, View, StyleSheet, Image, Button, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useFormik } from 'formik';
import { useFocusEffect } from '@react-navigation/native'
import { getPokemonsFavoriteApi } from '../api/favorite';
import { launchCamera } from 'react-native-image-picker';



export default function Account() {
    const [total, setTotal] = useState(10)

    const camera = async () => {
        const result = await launchCamera(options)
        alert(result)
    }




    const formik = useFormik({
        initialValues: {
            name: "",
            birthday: "",
            avatar: ""
        },
        onSubmit: async (formValue) => {
            // setName(formValue.name);
            // setBirthday(formValue.birthday)
            // console.log('datos enviados...', formik.values)

        }
    })

    useFocusEffect(
        useCallback(() => {
            (async () => {
                try {
                    const response = await getPokemonsFavoriteApi();
                    setTotal(response.length);

                } catch (error) {
                    setTotal(0);

                }
            })();
        }, [])
    );

    function resetInfo() {
        formik.setFieldValue("birthday", '')
        formik.setFieldValue("name", '')
        formik.setFieldValue("avatar", '')
    }

    return (
        <ScrollView>

            <View style={styles.content}>
                {/* <View style={styles.titleBlock}>
                <Text style={styles.title}>Welcome</Text>
                <Text style={styles.title}>{`...`}</Text>
            </View> */}

                <View style={styles.avatar} >
                    <TouchableOpacity onPress={camera}>
                        {formik.values.avatar ? null :
                            <Text style={{ marginBottom: 5 }}>Touch to add your avatar</Text>}
                        <Image
                            source={formik.values.avatar ? { uri: formik.values.avatar } : null}
                            style={{ width: 200, height: 200 }}

                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.dataContent}>
                    <Text style={styles.itemMenuTitle}>Name:</Text>
                    <TextInput style={styles.input}
                        value={formik.values.name}
                        onChangeText={(text) => formik.setFieldValue("name", text)}
                    />
                </View>

                <View style={styles.dataContent}>
                    <Text style={styles.itemMenuTitle}>Birthday:</Text>
                    <TextInput
                        style={styles.input}
                        value={formik.values.birthday}
                        onChangeText={(text) => formik.setFieldValue("birthday", text)}
                    />
                </View>
                <View style={styles.dataContent}>
                    <Text style={styles.menuTitle}>Pokemons favoritos:</Text>
                    <Text style={styles.menuTitle}>{total}</Text>
                </View>

            </View>
            <View style={styles.btns}>
                <Button style={styles.button}
                    onPress={formik.handleSubmit}
                    title="Save info"
                />
                <Button style={styles.button}
                    onPress={resetInfo}
                    title="Reset info"
                />
            </View>
        </ScrollView>
    )
}

function ItemMenu(props) {
    const { title, text } = props;

    return (
        <View style={styles.itemMenu}>
            <Text style={styles.itemMenuTitle}>{title}:</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        marginHorizontal: 20,
        marginTop: 10,
    },
    titleBlock: {
        marginBottom: 30,
    },
    title: {
        fontWeight: "bold",
        fontSize: 22,
    },
    avatar: {
        alignItems: 'center',
        marginHorizontal: 'auto',
        marginVertical: 10,
    },
    dataContent: {
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: "row",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: "#CFCFCF",
    },
    itemMenu: {
        flexDirection: "row",

    },
    itemMenuTitle: {
        paddingTop: 12,
        fontWeight: "bold",
        width: 100,
        marginLeft: 10,
    },
    button: {
        margin: 15,

    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        width: 220,
    },
    btns: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    menuTitle: {
        paddingTop: 12,
        fontWeight: "bold",
        fontSize: 20,
        marginLeft: 10,
    },
});
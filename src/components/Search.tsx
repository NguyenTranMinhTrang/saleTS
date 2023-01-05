/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Text } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';
import _ from 'lodash';
import AntDesign from 'react-native-vector-icons/AntDesign';
import actions from '../redux/actions';
import { forwardRef } from 'react';
import { useTypedSelector } from '../redux';
import { Filter, Props } from '../models';

const Search = forwardRef<TextInput, Props>((props, ref) => {
    const filterOriginal: Filter[] = useTypedSelector((state) => state.product.filterOriginal);
    const filter: Filter[] = useTypedSelector((state) => state.product.filter);
    React.useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    }, []);

    const debouncedResults = React.useCallback(
        _.debounce((text, filterOriginal) => {
            if (text !== '') {
                const searchText = _.lowerCase(text);
                const filterList: Filter[] = [];
                _.forEach(filterOriginal, (object) => {
                    const name = _.lowerCase(object.name);
                    if (name.indexOf(searchText) !== -1) {
                        filterList.push(object);
                    }
                });
                actions.updateFilterList(filterList);
            }
            else {
                actions.filterRefresh();
            }
        }, 300, { leading: true }),
        []
    );
    return (
        <View>
            <View style={styles.containerSearch} >
                <TouchableOpacity style={styles.buttonSearch}>
                    <AntDesign
                        size={30}
                        color={COLORS.white}
                        name="search1"
                    />
                </TouchableOpacity>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => debouncedResults(text, filterOriginal)}
                    ref={ref}
                />
            </View>
            <Text style={{ ...FONTS.h3, color: COLORS.white }}>Total: {filter.length}</Text>
        </View>
    );
});

const styles = StyleSheet.create({
    containerSearch: {
        backgroundColor: COLORS.primary,
        height: 60,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: SIZES.base,
    },
    buttonSearch: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        marginLeft: SIZES.base,
        flex: 1,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.primary,
        color: COLORS.white,
        height: 60,
        textAlignVertical: 'center',
        ...FONTS.h3,
    },
});

export default Search;


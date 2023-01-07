import React from 'react';
import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';
import SelectDropdown from 'react-native-select-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ItemPicker from './ItemPicker';
import { useTypedSelector } from '../redux';
import { Product } from '../models';

type Props = {
    setItem: (item: Product) => void,
}

const Combobox = ({ setItem }: Props) => {

    const products: Product[] = useTypedSelector((state) => state.product.products);

    const renderCustomizedRowChild = (item: Product) => {
        return (
            <ItemPicker name={item.name} />
        );
    };

    const renderDropdownIcon = (isOpened: boolean) => {
        return <MaterialIcons name={isOpened ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} color={COLORS.white} size={30} />;
    };

    const buttonTextAfterSelection = (selectedItem: Product) => {
        return selectedItem.name;
    };

    const emptyFunction = () => { };

    return (
        <SelectDropdown
            data={products}
            onSelect={(selectedItem: Product) => {
                setItem(selectedItem);
            }}
            renderCustomizedRowChild={renderCustomizedRowChild}
            rowStyle={styles.rowStyle}

            buttonStyle={styles.buttonStyle}

            buttonTextStyle={styles.buttonText}

            renderDropdownIcon={renderDropdownIcon}

            buttonTextAfterSelection={buttonTextAfterSelection}

            onChangeSearchInputText={emptyFunction}
        />
    );
};

const styles = StyleSheet.create({
    rowStyle: {
        height: 70,
        width: '100%',
        backgroundColor: COLORS.black,

    },
    buttonStyle: {
        flex: 1,
        backgroundColor: COLORS.lightGray,
        height: 60,
        borderRadius: SIZES.radius,
    },
    buttonText: {
        ...FONTS.h3,
        color: COLORS.white,
    },
});

export default Combobox;

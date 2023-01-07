import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import _ from 'lodash';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PSPDFKitView from 'react-native-pspdfkit';
import { ModalFile } from '../components';
import { PickFileScreenProps } from '../navigation/types';


const PickFile = ({ navigation }: PickFileScreenProps) => {

    const [fileResponse, setFileResponse] = React.useState<DocumentPickerResponse[]>([]);
    const [path, setPath] = React.useState<DocumentPickerResponse>();
    const [show, setShow] = React.useState<boolean>(false);

    const handleDocumentSelection = React.useCallback(async () => {
        try {
            const response: DocumentPickerResponse[] = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                allowMultiSelection: true,
            });

            setFileResponse((prev: DocumentPickerResponse[]) => {
                const newArray: DocumentPickerResponse[] = _.concat(prev, response);
                const filterArray: DocumentPickerResponse[] = _.uniqBy(newArray, 'name');
                const filterType = _.filter(filterArray, (file) => {
                    const type: string = file.type as string;
                    if (type === 'application/pdf' || _.startsWith(type, 'image/')) {
                        return true;
                    }
                    return false;
                });
                return filterType;
            });
        } catch (err) {
            console.warn(err);
        }
    }, []);

    return (
        <View style={styles.container}>
            {
                (path && path.type === 'application/pdf') &&
                <ModalFile show={show} setShow={setShow}>
                    <PSPDFKitView
                        document={path.uri}
                        configuration={{
                            showThumbnailBar: 'scrollable',
                            pageTransition: 'scrollContinuous',
                            scrollDirection: 'vertical',
                        }}
                        fragmentTag="PDF1"
                        style={styles.containerFiles}
                    />
                </ModalFile>
            }
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.buttonBack}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign
                        name="arrowleft"
                        size={30}
                        color={COLORS.white}
                    />
                </TouchableOpacity>
                <Text style={{ ...FONTS.h2, color: COLORS.white }}>Upload File</Text>

                <TouchableOpacity
                    style={styles.buttonRefresh}

                    onPress={handleDocumentSelection}
                >
                    <AntDesign name="addfile" color={COLORS.white} size={35} />
                </TouchableOpacity>

            </View>

            <Text style={{ ...FONTS.h3, color: COLORS.white, paddingLeft: SIZES.padding }}>Choose pdf / images file</Text>

            <View style={styles.containerFile}>
                {
                    fileResponse &&
                    _.map(fileResponse, (file, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={styles.buttonFile}
                                onPress={() => {
                                    setPath(file);
                                    if (file.type === 'application/pdf') {
                                        setShow(true);
                                    }
                                }}
                            >
                                <Text style={{ ...FONTS.h3, color: COLORS.white }}>{file.name}</Text>
                            </TouchableOpacity>
                        );
                    })
                }
            </View>

            {
                (path && _.startsWith(path.type as string, 'image/')) &&
                <View
                    style={styles.containerImage}
                >
                    <Image
                        source={{ uri: path.uri }}
                        style={styles.image}
                    />
                </View>
            }

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SIZES.padding,
    },
    button: {
        backgroundColor: COLORS.white,
        padding: SIZES.padding,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZES.radius,
        width: 200,
    },
    containerFile: {
        padding: SIZES.padding,
    },
    buttonBack: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    buttonRefresh: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.lightGray,
        borderRadius: SIZES.radius,
    },
    buttonFile: {
        padding: SIZES.padding,
        backgroundColor: COLORS.primary,
        marginBottom: SIZES.base,
    },
    containerFiles: {
        width: '100%',
        height: '100%',
        zIndex: 1,
    },
    containerImage: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.padding,
    },
    image: {
        height: '100%',
        width: '100%',
    },

});

export default PickFile;

import Symptom from '../../../firebaseConnect/data/Symptom';
import { Button, Modal, View, StyleSheet, ScrollView } from 'react-native';
import SymptomDayModalCard from './SymptomDayModalCard';

interface SymptomDayModalProps {
    Symptoms: Symptom[],
    visible: boolean,
    onClose: () => void
}

const SymptomDayModal: React.FC<SymptomDayModalProps> = ({ Symptoms, visible, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ScrollView style={styles.scrollView}>
                        {Symptoms.map((symptom) => (
                            <SymptomDayModalCard key={symptom.id} Symptom={symptom} />
                        ))}
                    </ScrollView>
                    <Button title="Close" onPress={onClose}/>
                </View>
            </View>
        </Modal>
    );
};

export default SymptomDayModal;

// Styles
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        maxHeight: '80%', // Ensure the modal is at a fixed size
        width: '80%', // Ensure the modal is at a fixed size
    },
    scrollView: {
        width: '100%',
    },
});
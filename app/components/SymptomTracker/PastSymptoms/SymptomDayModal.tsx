import Symptom from '../../../firebaseConnect/data/Symptom';
import { Button, Modal, View, StyleSheet } from 'react-native';
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
            <View style={styles.modalView}>
                {Symptoms.map((symptom) => (
                    <SymptomDayModalCard key={symptom.id} Symptom={symptom} />
                ))}
                <Button title="Close" onPress={onClose}/>
            </View>
        </Modal>
    );
};

export default SymptomDayModal;

// Styles
const styles = StyleSheet.create({
    modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
});
    

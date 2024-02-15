import { useState } from "react";
import Symptom from "../../firebaseConnect/data/Symptom";
import Slider from "@react-native-community/slider";
import { View, Text, StyleSheet, Modal, TextInput, Button } from "react-native";

interface AddSympModalProps {
	visible: boolean;
	onClose: () => void;
	onSave: (symptom: Symptom) => void;
}

const AddSymptomModal: React.FC<AddSympModalProps> = ({
	visible,
	onClose,
	onSave,
}) => {
	const [symptomName, setSymptomName] = useState("");
	const [severity, setSeverity] = useState(1);
	const [notes, setNotes] = useState("");

	const handleSave = () => {
		if (symptomName === "") {
			alert("Please enter a symptom name");
			return;
		}
		if (notes === "") {
			alert("Please enter notes");
			return;
		}
		onSave({
			id: Math.random().toString(),
			userId: "1",
			diseaseName: symptomName,
			duration: 1,
			date: new Date(),
			severity: severity,
			notes: notes,
		});
		setSymptomName("");
		setSeverity(1);
		setNotes("");
	};

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<View style={styles.modalView}>
				<Text>Add Symptom</Text>
				<TextInput
					style={styles.input}
					onChangeText={(text) => setSymptomName(text)}
					value={symptomName}
					placeholder="Symptom Name"
				/>
				<Slider
					style={styles.slider}
					minimumValue={1}
					maximumValue={10}
					value={severity}
					onValueChange={(value) => setSeverity(value)}
					step={1}
				/>
				<Text style={styles.sliderValue}>{severity}</Text>
				<TextInput
					style={styles.input}
					onChangeText={(text) => setNotes(text)}
					value={notes}
					placeholder="Add notes"
				/>
				<Button title="Add" onPress={handleSave} />
				<Button title="Cancel" onPress={onClose} color="gray" />
			</View>
		</Modal>
	);
};

export default AddSymptomModal;

const styles = StyleSheet.create({
	slider: {
		width: "100%",
		height: 40,
		color: "#000",
	},
	sliderValue: {
		textAlign: "right",
	},
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
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		width: "100%",
		marginTop: 10,
		padding: 10,
	},
});

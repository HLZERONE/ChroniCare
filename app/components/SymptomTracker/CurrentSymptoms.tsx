import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal, TextInput, Button } from "react-native";
import Symptom from "../../firebaseConnect/data/Symptom";
import Slider from "@react-native-community/slider";
import { FontAwesome } from "@expo/vector-icons";

interface EditSymptomModalProps {
	visible: boolean;
	symptom: Symptom;
	onClose: () => void;
	onSave: (symptom: Symptom) => void;
	onDelete: (id: string) => void;
}

const EditSymptomModal: React.FC<EditSymptomModalProps> = ({
	visible,
	symptom,
	onClose,
	onSave,
	onDelete,
}) => {
	const [editedSymptom, setEditedSymptom] = useState<Symptom>(symptom);

	const handleSave = () => {
		onSave(editedSymptom);
	};

	const handleDelete = () => {
		onDelete(symptom.id);
		onClose();
	};

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<View style={styles.modalView}>
				<Text style={styles.title}>Edit Symptom</Text>
				<Text style={styles.inputTitle}>Pain Level</Text>
				<View style={styles.painLevelNumber}>
					<Slider
						style={styles.slider}
						minimumValue={1}
						maximumValue={10}
						value={editedSymptom.severity}
						onValueChange={(value) =>
							setEditedSymptom({ ...editedSymptom, severity: value })
						}
						step={1}
					/>
					<Text style={styles.sliderValue}>{editedSymptom.severity}</Text>
				</View>
				<Text style={styles.inputTitle}>Notes</Text>
				<TextInput
					style={styles.input}
					onChangeText={(text) =>
						setEditedSymptom({ ...editedSymptom, notes: text })
					}
					value={editedSymptom.notes}
					placeholder="Add notes"
				/>
				<Button title="Save Changes" onPress={handleSave} />
				<Button title="Delete" onPress={handleDelete} color="red" />
				<Button title="Cancel" onPress={onClose} color="gray" />
			</View>
		</Modal>
	);
};

interface SymptomProps {
	onChange: (symptom: Symptom) => void;
	onDelete: (id: string) => void;
	symptom: Symptom;
}

// Individual symptom component
const SingleSymptom: React.FC<SymptomProps> = ({
	onChange,
	onDelete,
	symptom,
}) => {
	const [editMode, setEditMode] = useState(false);
	const [singleSymptom, setSingleSymptom] = useState(symptom);

	const handleEditSave = (newSymptom: Symptom) => {
		setSingleSymptom({
			...singleSymptom,
			severity: newSymptom.severity,
			notes: newSymptom.notes,
		});
		onChange(newSymptom);
		setEditMode(false);
	};

	const handleEditDelete = (id: string) => {
		// Delete the symptom
		setEditMode(false);
		onDelete(id);
	};

	return (
		<View style={styles.symptomContainer}>
			<View style={styles.symptomTitleRow}>
				<Text style={styles.symptomName}>{singleSymptom.diseaseName}</Text>
				<FontAwesome
					name="pencil-square-o"
					size={24}
					color="black"
					onPress={() => setEditMode(true)}
				/>
			</View>
			<View style={styles.painLevelNumber}>
				<Slider
					style={styles.slider}
					minimumValue={1}
					maximumValue={10}
					value={symptom.severity}
					disabled={true}
				/>
				<Text style={styles.sliderValue}>{symptom.severity}</Text>
			</View>
			<EditSymptomModal
				visible={editMode}
				symptom={symptom}
				onClose={() => setEditMode(false)}
				onSave={handleEditSave}
				onDelete={handleEditDelete}
			/>
		</View>
	);
};

interface CurrentSymptomsProps {
	symptoms: Symptom[];
	onChange: (symptoms: Symptom[]) => void;
}

const CurrentSymptoms: React.FC<CurrentSymptomsProps> = ({
	symptoms,
	onChange,
}) => {
	const [symptomValues, setSymptomValues] = useState(symptoms);

	useEffect(() => {
		setSymptomValues(symptoms);
	}, [symptoms]);

	const handleEditModalChange = (newSymptom: Symptom) => {
		// Update the symptom severity and notes
		setSymptomValues(
			[
				...symptomValues.filter((symptom) => symptom.id !== newSymptom.id),
				newSymptom,
			].sort((a, b) => parseInt(a.id) - parseInt(b.id))
		);
		onChange(symptomValues);
	};

	const handleDelete = (id: string) => {
		// Delete the symptom
		setSymptomValues(symptomValues.filter((symptom) => symptom.id !== id));
		onChange(symptomValues);
	};

	return (
		<View style={styles.currentSymptomsContainer}>
			<Text style={styles.header}>Current Symptoms</Text>
			<View style={styles.symptomsContainer}>
				{symptomValues.map((symptom, index) => (
					<SingleSymptom
						key={symptom.id}
						symptom={symptom}
						onChange={(newSymptom) => handleEditModalChange(newSymptom)}
						onDelete={(id) => handleDelete(id)}
					/>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	currentSymptomsContainer: {
		width: "85%",
		marginBottom: 20,
	},
	symptomsContainer: {
		backgroundColor: "white",
		borderRadius: 20,
		padding: 20,
	},
	symptomContainer: {
		marginBottom: 20,
	},
	header: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
	},
	symptomName: {
		fontSize: 16,
		fontWeight: "bold",
	},
	slider: {
		width: "100%",
		maxWidth: "80%",
		height: 40,
		color: "#000",
	},
	sliderValue: {
		fontSize: 20,
		fontWeight: "bold",
		marginLeft: 10,
	},
	symptomTitleRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
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
	},
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		width: "100%",
		marginTop: 10,
		padding: 10,
	},
	painLevelNumber: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	inputTitle: {
		fontSize: 15,
		fontWeight: "bold",
		marginVertical: 10,
		textAlign: "left",
		alignSelf: "flex-start",
	},
});

export default CurrentSymptoms;

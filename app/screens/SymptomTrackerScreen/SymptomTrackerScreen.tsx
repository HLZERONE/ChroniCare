import React, { useEffect, useState } from "react";
import { Button, ScrollView, Text, StyleSheet } from "react-native";
import CurrentSymptoms from "../../components/SymptomTracker/CurrentSymptoms";
import AddSymptomModal from "../../components/SymptomTracker/CreateSymptomModal";
import Symptom from "../../firebaseConnect/data/Symptom";
import PastSymptoms from "../../components/SymptomTracker/PastSymptoms/PastSymptoms";

const SymptomTracker = () => {
	const [addSymptomMode, setAddSymptomMode] = useState(false);
	const [symptoms, setSymptoms] = useState<Symptom[]>([]);

	useEffect(() => {
		setSymptoms([
			{
				id: "1",
				userId: "1",
				diseaseName: "Fever",
				duration: 1,
				date: new Date(),
				severity: 5,
				notes: "I have a fever",
			},
			{
				id: "2",
				userId: "1",
				diseaseName: "Headache",
				duration: 1,
				date: new Date(),
				severity: 3,
				notes: "I have a headache",
			},
			{
				id: "3",
				userId: "1",
				diseaseName: "Cough",
				duration: 1,
				date: new Date(),
				severity: 2,
				notes: "I have a cough",
			}
		]);
	}, []);

	const handleSaveAddSymptom = (symptom: Symptom) => {
		setSymptoms([...symptoms, symptom]);
		setAddSymptomMode(false);
	};

	const handleChangeCurrentSymptoms = (symptoms: Symptom[]) => {
		setSymptoms(symptoms);
	};

	return (
		<ScrollView
			contentContainerStyle={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text style={styles.headerStyle}>Symptom Tracker</Text>
			<Button title="+ Add Symptom" onPress={() => setAddSymptomMode(true)} />
			<AddSymptomModal
				visible={addSymptomMode}
				onClose={() => setAddSymptomMode(false)}
				onSave={handleSaveAddSymptom}
			/>
			<CurrentSymptoms
				symptoms={symptoms}
				onChange={handleChangeCurrentSymptoms}
			/>
			<PastSymptoms symptoms={symptoms} />
		</ScrollView>
	);
};
export default SymptomTracker;

const styles = StyleSheet.create({
	headerStyle: {
	  fontSize: 24, // Larger font size for headers
	  fontWeight: 'bold', // Bold font weight to make it stand out
	  color: '#000', // Typically, headers are in a darker or different color
	  textAlign: 'center', // Center-aligned text is common for headers
	  marginTop: 20, // Optional: add some margin to the top for spacing
	  marginBottom: 10, // Optional: add some margin to the bottom for spacing
	},
  });

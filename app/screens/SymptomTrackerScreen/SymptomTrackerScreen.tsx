import React, { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet, Pressable, SafeAreaView } from "react-native";
import CurrentSymptoms from "../../components/SymptomTracker/CurrentSymptoms";
import AddSymptomModal from "../../components/SymptomTracker/AddSymptomModal";
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
		<SafeAreaView style={{
			flex: 1,
			backgroundColor: 'rgba(117, 196, 205, 0.19)',
		}}>
			<ScrollView
				contentContainerStyle={{
					justifyContent: "center",
					alignItems: "center",
					paddingBottom: 40,
				}}
				style={styles.container}
			>
				<Text style={styles.headerStyle}>Symptom Tracker</Text>
				<Pressable onPress={() => setAddSymptomMode(true)} style={styles.button}>
					<Text style={styles.buttonText}>+ Add Symptom</Text>
				</Pressable>
				<AddSymptomModal
					visible={addSymptomMode}
					onClose={() => setAddSymptomMode(false)}
					onSave={handleSaveAddSymptom}
				/>
				<CurrentSymptoms
					symptoms={symptoms}
					onChange={handleChangeCurrentSymptoms}
				/>
				<PastSymptoms symptoms={symptoms}/>
			</ScrollView>
		</SafeAreaView>
	);
};
export default SymptomTracker;

const styles = StyleSheet.create({
	headerStyle: {
	  fontSize: 30, // Larger font size for headers
	  fontWeight: 'bold', // Bold font weight to make it stand out
	  color: '#000', // Typically, headers are in a darker or different color
	  textAlign: 'center', // Center-aligned text is common for headers
	  marginBottom: 10, // Optional: add some margin to the bottom for spacing
	},
	container: {
		paddingVertical: 24,
	},
	button: {
		backgroundColor: '#1EAFB3',
		padding: 15,
		borderRadius: 30,
		marginVertical: 10,
		width: '50%',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.32,
	},
	buttonText: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		color: 'white',
	},
  });

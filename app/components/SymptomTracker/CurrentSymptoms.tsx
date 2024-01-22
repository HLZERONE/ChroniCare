import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Symptom from "../../firebaseConnect/data/Symptom";
import Slider from "@react-native-community/slider";
import { FontAwesome } from "@expo/vector-icons";

interface SymptomProps {
	name: string;
	onChange: (value: number) => void;
	value: number;
}

// Individual symptom component
const SingleSymptom: React.FC<SymptomProps> = ({ name, onChange, value }) => (
	<View style={styles.symptomContainer}>
		<View style={styles.symptomTitle}>
			<Text style={styles.symptomName}>{name}</Text>
			<FontAwesome name="pencil-square-o" size={24} color="black" />
		</View>
		<Slider
			style={styles.slider}
			minimumValue={0}
			maximumValue={10}
			value={value}
			onValueChange={onChange}
		/>
		<Text style={styles.sliderValue}>{value}</Text>
	</View>
);

interface CurrentSymptomsProps {
	symptoms: Symptom[];
}

const CurrentSymptoms: React.FC<CurrentSymptomsProps> = ({ symptoms }) => {
	const [symptomValues, setSymptomValues] = useState(symptoms);

	const handleSliderChange = (name: string, newValue: number) => {
		setSymptomValues((prevValues) =>
			prevValues.map((symptom) =>
				symptom.name === name ? { ...symptom, severity: newValue } : symptom
			)
		);
	};

	useEffect(() => {
		// dummy data
		setSymptomValues([
			{
				id: "1",
				name: "Fever",
				date: new Date(),
				severity: 7,
				notes: "I have a fever",
			},
			{
				id: "2",
				name: "Cough",
				date: new Date(),
				severity: 3,
				notes: "I have a cough",
			},
		]);
	}, []);

	return (
		<View>
			<Text style={styles.header}>Current Symptoms</Text>
			{symptomValues.map((symptom, index) => (
				<SingleSymptom
					key={index}
					name={symptom.name}
					value={symptom.severity}
					onChange={(newValue) => handleSliderChange(symptom.name, newValue)}
				/>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
	},
	symptomContainer: {
		marginBottom: 20,
	},
	symptomName: {
		fontSize: 16,
	},
	slider: {
		width: "100%",
		height: 40,
		color: "#000",
	},
	sliderValue: {
		textAlign: "right",
	},
    symptomTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});

export default CurrentSymptoms;

import React,{ useState } from "react";
import { View,TextInput } from "react-native";

type UserForm = {
	usuario: string;
	aceptaTerminos: boolean;
}

const Formuliuiu: React.FC = () => {
	const [user, setUser] = useState<UserForm>({
		usuario: "",
		aceptaTerminos: false,
	});

	const {usuario, aceptaTerminos} = user;

	return(
		<View>
			<TextInput
				value={usuario}
				onChangeText={(text) => setUser({ ...user, usuario: text })}
			/>
		</View>
	)

}

export default Formuliuiu;
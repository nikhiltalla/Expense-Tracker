import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#5e8b7e',
  secondary: '#a7c4bc',
  accent: '#f6f5f5',
  textPrimary: '#303030',
  textSecondary: '#555555',
  button: '#8bbabb',
  buttonTitle: '#ffffff',
  inputBackground: '#ffffff',
  modalBackground: '#ffffff',
  background: '#eef2f3',
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 55,
    backgroundColor: colors.background,
  },
  header: {
    fontSize: 28,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  button: {
    backgroundColor: colors.button,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: colors.buttonTitle,
    fontSize: 18,
    fontWeight: '500',
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.modalBackground,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    color: colors.textPrimary,
  },
  modalButton: {
    padding: 10,
    elevation: 2,
  },
  modalButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  linkText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});

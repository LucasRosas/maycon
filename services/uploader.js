import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useFirebaseStorage } from "vuefire";

import { getAuth, updateProfile } from "firebase/auth";

/**
 * Faz upload de imagem a partir de um blob URL para o Firebase Storage
 * @param {string} blobUrl - URL do tipo blob:http://...
 * @param {string} path - Caminho no Storage (ex: 'images/minhaFoto.png')
 * @returns {Promise<string>} URL pública da imagem
 */
export async function uploadBlobUrlToFirebase(blobUrl, path) {
  try {
    const response = await fetch(blobUrl); // baixa o blob
    const blob = await response.blob();

    const storage = useFirebaseStorage();
    const storageRef = ref(storage, path);

    // Faz upload
    await uploadBytes(storageRef, blob);

    // Pega URL de download
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error) {
    console.error("Erro ao fazer upload para Firebase:", error);
    throw error;
  }
}

export async function renameUser(name) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    await updateProfile(user, {
      displayName: name,
    });
    await auth.currentUser.reload();
  }
}

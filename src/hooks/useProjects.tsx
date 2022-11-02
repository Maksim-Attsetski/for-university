import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { fs } from '../firebase';
import { IProject } from '../types';
import { useTypedSelector } from './redux';
import { useActions } from './useActions';

const useProjects = () => {
  const { action } = useActions();
  const { currentUser } = useTypedSelector(state => state.auth);

  const onGetProjects = async (): Promise<void> => {
    try {
      if (!currentUser) return;

      action.setIsLoading(true);
      let projects: IProject[] = [];

      const q = query(collection(fs, 'projects'), where('userUid', '==', currentUser?.uid));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(doc => {
        projects.push({ ...doc.data(), id: doc.id } as IProject);
      });

      action.setProjects(projects);
    } catch (error) {
      console.log(error);
    } finally {
      action.setIsLoading(false);
    }
  };

  const onDeleteProject = async (id: string): Promise<void> => {
    try {
      action.setIsLoading(true);
      await deleteDoc(doc(fs, 'projects', id));
      action.deleteProject(id);
    } catch (error) {
      console.log(error);
    } finally {
      action.setIsLoading(false);
    }
  };

  const onAddProject = async (): Promise<void> => {
    if (!currentUser) return;
    try {
      action.setIsLoading(true);
      const name = prompt('Введите название проекта');

      if (!name) return;

      const newProject: IProject = {
        id: `${currentUser.uid}/${name}/${Math.random()}`,
        userUid: currentUser.uid,
        workId: 1,
        name,
        isDone: false,
        createdAt: Date.now(),
      };

      const project = await addDoc(collection(fs, 'projects'), newProject);
      action.addProject({ ...newProject, id: project.id });
    } catch (e) {
      console.error('Error adding document: ', e);
    } finally {
      action.setIsLoading(false);
    }
  };

  const onUpdateProject = async (project: IProject) => {
    try {
      action.setIsLoading(true);

      const projectsRef = doc(fs, "projects", project.id);
      await updateDoc(projectsRef, { ...project });
      action.updateProject(project);
    } catch (error) {
      console.error(error);
    } finally {
      action.setIsLoading(false);
    }
  }

  return {
    onGetProjects,
    onAddProject,
    onDeleteProject,
    onUpdateProject,
  };
};

export default useProjects;

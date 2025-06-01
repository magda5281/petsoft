'use client';
import { addPet, deletePet, editPet } from '@/actions/actions';
import { Pet } from '@/lib/types';
import React, { createContext, useOptimistic, useState } from 'react';
import { toast } from 'sonner';

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};
type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleChangeSelectedPetId: (id: string | null) => void;
  handleCheckoutPet: (id: string | null) => Promise<void>;
  handleAddPet: (newPet: Omit<Pet, 'id'>) => Promise<void>;
  handleEditPet: (petId: string, newPetData: Omit<Pet, 'id'>) => Promise<void>;
};
export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  children,
  data,
}: PetContextProviderProps) {
  //state
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, newPet) => {
      return [...state, { ...newPet, id: Date.now() }];
    }
  );
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  //derived state
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  //actions/ event handlers

  const handleAddPet = async (newPet: Omit<Pet, 'id'>) => {
    setOptimisticPets(newPet);
    const error = await addPet(newPet);
    if (error) {
      toast.warning(error.message);
    }
  };

  const handleEditPet = async (petId: string, newPetData: Omit<Pet, 'id'>) => {
    // setOptimisticPets({ ...newPetData, petId });
    const error = await editPet(petId, newPetData);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleChangeSelectedPetId = (id: string | null) => {
    setSelectedPetId(id);
  };

  const handleCheckoutPet = async (petId: string | null) => {
    const error = await deletePet(petId);
    if (error) {
      toast.warning(error.message);
    }

    setSelectedPetId(null);
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        selectedPet,
        selectedPetId,
        numberOfPets,
        handleChangeSelectedPetId,
        handleCheckoutPet,
        handleAddPet,
        handleEditPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}

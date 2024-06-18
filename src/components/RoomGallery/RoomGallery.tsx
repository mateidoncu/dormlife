'use client';

import { FC, useState } from 'react';
import Image from 'next/image';

import { Image as ImageType } from '@/models/room';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';

const RoomGallery: FC<{ photos: ImageType[] }> = ({ photos }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const openModal = (index: number) => {
    setCurrentPhotoIndex(index);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handlePrevious = () => {
    setCurrentPhotoIndex(prevIndex =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentPhotoIndex(prevIndex =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const maximumVisiblePhotos = 4;
  const totalPhotos = photos.length;
  const displayPhotos = photos.slice(1, maximumVisiblePhotos - 1);
  const remainingPhotosCount = totalPhotos - maximumVisiblePhotos;

  return (
    <div className='container mx-auto'>
      <div className='grid md:grid-cols-2 relative gap-5 px-3'>
        <div className='h-[540px] relative rounded-2xl overflow-hidden'>
          <div className='hidden md:flex justify-center items-center w-full h-full'>
            <Image
              src={photos[0].url}
              alt={`Room Photo ${currentPhotoIndex + 1}`}
              className='hover:scale-125 transition duration-500 cursor-pointer rounded-xl'
              layout='fill'
              objectFit='cover'
              quality={100}
              onClick={openModal.bind(this, 0)}
            />
          </div>
          <div className='md:hidden flex justify-center items-center w-full h-full'>
            <Image
              src={photos[currentPhotoIndex].url}
              alt={`Room Photo ${currentPhotoIndex + 1}`}
              className='img w-full'
              layout='fill'
              objectFit='cover'
              quality={100}
              onClick={openModal.bind(this, 0)}
            />
          </div>
        </div>
        <div className='md:grid grid-rows-2 h-full gap-5'>
          {displayPhotos.slice(0, 2).map((photo, index) => (
            <div
              key={index}
              className='cursor-pointer h-64 rounded-2xl overflow-hidden'
              onClick={openModal.bind(this, index + 1)}
            >
              <Image
                width={150}
                height={150}
                src={photo.url}
                alt={`Room Photo ${index + 2}`}
                className='hover:scale-125 transition duration-500 cursor-pointer rounded-xl w-full h-full object-cover'
                quality={100}
              />
            </div>
          ))}
          {remainingPhotosCount > 0 && (
            <div
              className='cursor-pointer relative h-64 rounded-2xl overflow-hidden'
              onClick={openModal.bind(this, maximumVisiblePhotos - 1)}
            >
              <Image
                width={150}
                height={150}
                src={photos[maximumVisiblePhotos - 1].url}
                alt={`Room Photo ${maximumVisiblePhotos}`}
                className='img w-full h-full object-cover'
                quality={100}
              />
              <div className='absolute cursor-pointer text-white inset-0 flex justify-center bg-[rgba(0,0,0,0.5)] items-center text-2xl'>
                + {remainingPhotosCount}
              </div>
            </div>
          )}
        </div>

        {showModal && (
          <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-90 z-[55]'>
            <button
              className='absolute top-2 right-2 text-white text-lg z-[60]'
              onClick={closeModal}
            >
              <MdCancel className='font-medium text-2xl text-tertiary-dark' />
            </button>
            <FaArrowLeft
              className='cursor-pointer text-white text-3xl absolute left-4 z-[60]'
              onClick={handlePrevious}
            />
            <div className='relative w-full h-full max-w-4xl flex justify-center items-center z-[50]'>
              <div className='relative w-full h-full flex justify-center items-center'>
                <Image
                  src={photos[currentPhotoIndex].url}
                  alt={`Room Photo ${currentPhotoIndex + 1}`}
                  layout='fill'
                  objectFit='contain'
                  className='max-h-[75vh] max-w-[90vw]'
                  quality={100}
                />
              </div>
            </div>
            <FaArrowRight
              className='cursor-pointer text-white text-3xl absolute right-4 z-[60]'
              onClick={handleNext}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomGallery;

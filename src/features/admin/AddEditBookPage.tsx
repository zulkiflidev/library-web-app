import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from "@/components/ui/textarea";

import useCategories from '@/hooks/useCategories';
import useAuthors from '@/hooks/admin/useAuthors'
import useAddAuthor from '@/hooks/admin/useAddAuthor';
import useAddCategory from '@/hooks/admin/useAddCategory'

import { useAddBook, useEditBook } from '@/hooks/admin/useAdminBooksMutation';
import useBookDetail from '@/hooks/useBookDetail';

import type { ChangeEvent } from 'react';
// import Breadcrumb from '@/components/common/Breadcrumb';
// import ProfileTabs from '@/components/common/ProfileTabs';
import { ArrowLeft } from 'lucide-react';
import UploadIcon from '@/assets/uploadIcon.svg';

function AddEditBookPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = !!id

  const { data: bookData } = useBookDetail(id ?? '')
  const { data: categoriesData } = useCategories()
  
  const { data: authorsData } = useAuthors()
  const { mutate: addBook, isPending: isAdding } = useAddBook()

  const { mutate: editBook, isPending: isEditing } = useEditBook()
  const { mutate: addAuthor, isPending: isAddingAuthor } = useAddAuthor()
  const { mutate: addCategory, isPending: isAddingCategory } = useAddCategory()


  //===untuk form....
  const [title, setTitle] = useState('')
  const [isbn, setIsbn] = useState('')
  const [description, setDescription] = useState('')
  const [publishedYear, setPublishedYear] = useState('')
  const [totalCopies, setTotalCopies] = useState('')

  const [availableCopies, setAvailableCopies] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [authorId, setAuthorId] = useState('')
  const [authorName, setAuthorName] = useState('')
  // const [coverImage, setCoverImage] = useState<File | null>(null)

  // form tambah author baru
  const [showAddAuthor, setShowAddAuthor] = useState(false)
  const [newAuthorName, setNewAuthorName] = useState('')
  const [newAuthorBio, setNewAuthorBio] = useState('')

  // form tambah category baru
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')

  
  //untuk upload gambar....

  const [coverImageBase64, setCoverImageBase64] = useState<string>('');


  // isi form kalau mode edit
  useEffect(() => {

    if (bookData && isEdit) {
      
      setTitle(bookData.title)
      setIsbn(bookData.isbn)
      setDescription( bookData.description )
      
      setPublishedYear(  String(bookData.publishedYear) )
      setTotalCopies(  String(bookData.totalCopies)  )
      setAvailableCopies(String(bookData.availableCopies) )
      
      setCategoryId( String(bookData.category?.id ?? '') )
      setAuthorId(  String(bookData.authorId) )
      setAuthorName(bookData.author.name)

    }
  }, [bookData, isEdit])



  const handleAddAuthor = () => {
    addAuthor(
      { name: newAuthorName, bio: newAuthorBio },
      {
        onSuccess: (data) => {

          setAuthorId(String(data.data.id))
          setAuthorName(data.data.name)
          setShowAddAuthor(false)
          setNewAuthorName('')
          setNewAuthorBio('')
        
        }
      }
    )

  }

  const handleAddCategory = () => {
    addCategory(
      { name: newCategoryName },
      {
        onSuccess: (data) => {

          setCategoryId(String(data.data.id))
          setShowAddCategory(false)
          setNewCategoryName('')
        
        }
      }
    )

  }


  const handleSubmit = () => {

    const payload = {

      title, isbn, description,
      publishedYear: Number(publishedYear),
      totalCopies: Number(totalCopies),
      availableCopies: Number(availableCopies),

      categoryId: Number(categoryId),
      authorId: Number(authorId),
      authorName,
      coverImage: coverImageBase64 || undefined,

    }

    if (isEdit && id) {

        editBook(

            { id: Number(id), payload },
            { onSuccess: () => navigate('/admin/books') }
        )

    }
    else{

      addBook(

        payload as any,
        {
          onSuccess: () => navigate('/admin/books')
        }
      )
    }

  }

  const isPending = isAdding || isEditing
  const handleCoverChange = ( e: ChangeEvent<HTMLInputElement>) =>{

      const file = e.target.files?.[0];

      if (!file) return

      const reader = new FileReader()
      reader.onloadend = () => {

        setCoverImageBase64(reader.result as string)
        //setCoverImage(file)
      
      }
      reader.readAsDataURL(file);
  
  } 

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* <Breadcrumb items={
          [
              { label: 'Home', href: '/' },
              { label: 'Add Book (Admin)' },
          ]
      } 
      /> */}

      <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-16 h-16 mr-4" />
          <p className="font-bold text-xl">
              <h1 className="text-2xl font-bold">{isEdit ? 'Edit Book' : 'Add Book'}</h1>
              
          </p>
      </Button>

      {/* <ProfileTabs variant="admin" /> */}

      {/* <h1 className="text-2xl font-bold">{isEdit ? 'Edit Buku' : 'Tambah Buku'}</h1> */}

      <div className="flex flex-col gap-4 wspace-y-4">

        <label className="text-xs font-medium text-slate-700">
          <p className="font-bold">Title</p>
          <Input placeholder="" value={title}
              onChange={
          
                (e) => setTitle(e.target.value)
          
              } 
          />
        </label>
        
        <label className="text-xs font-medium text-slate-700">
          <p className="font-bold">ISBN</p>
          <Input placeholder="" value={isbn}         
            onChange={          
                (e) => setIsbn(e.target.value)
              } 
            />

        </label>
        
        {/* Pilih Author */}
        <label className="text-xs font-medium text-slate-700">
          <p className="font-bold">Author</p> 
          <div className="space-y-2">
            <select
              className="w-full border rounded-md px-3 py-2 text-sm bg-background"
              value={authorId}
              
              onChange={
                (e) => {
                  
                  setAuthorId(e.target.value)
                  const author = authorsData?.authors.find(

                    (a) => String(a.id) === e.target.value
                  
                  )
                  if (author) setAuthorName(author.name)                
                }
              }            
            >
              <option value="">Please choose author</option>
              {authorsData?.authors.map((author) => (
                <option key={author.id} 
                        value={author.id}>{author.name}
                </option>
              
              ))}
            </select>
            
            <Button
              size="sm" variant="default"
              onClick={
              
                () => setShowAddAuthor(!showAddAuthor)
              
              }
            >
              + Add new Author
            
            </Button>
            
            
              {showAddAuthor && (

                <div className="space-y-2">
                  
                  <Input
                    placeholder="Nama author baru"
                    value={newAuthorName}
                    onChange={
                    
                      (e) => setNewAuthorName(e.target.value)
                    
                    }
                  />
                  
                  <Input
                    placeholder="Bio author"
                    value={newAuthorBio}
                    onChange={
                      (e) => setNewAuthorBio(e.target.value)
                    
                    }
                  />

                  <Button
                    size="sm"
                    disabled={isAddingAuthor}
                    onClick={handleAddAuthor}
                  >
                    Simpan
                  
                  </Button>
                </div>
              )
            }
          </div>
        </label>
        {/* end  Pilih Author*/}

        {/* pilih category */}
        <label className="text-xs font-medium text-slate-700">
          
          <p className="font-bold">Category</p>
          <div className="space-y-2">
              <select
                className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                value={categoryId}

                onChange={
                  
                  (e) => setCategoryId(e.target.value)
                
                }
              >
                <option value="">Choose category</option>
                {
                  categoriesData?.categories.map(
                    (cat) => (
                      <option key={cat.id} 
                              value={cat.id}>
                                
                                {cat.name}
                      </option>
                  
                  ))
                }
              
              </select>
            
              <Button
                size="sm" variant="default"
                onClick={
                  
                  () => setShowAddCategory(!showAddCategory)
                }
              >
                + Add New Category

              </Button>
            
            
              {showAddCategory && (
                <div className="flex gap-2">
                  
                  <Input
                    placeholder="Nama kategori baru"
                    value={newCategoryName}
                    
                    onChange={
                      (e) => setNewCategoryName(e.target.value)
                    }
                  />
                  
                  <Button

                    size="sm"
                    disabled={isAddingCategory}
                    onClick={handleAddCategory}
                  
                  >
                    Save
                  </Button>
                </div>

              )            
            }
          </div>
        </label>
        {/* end pilih category */}
        
        <label className="text-xs font-medium text-slate-700">
          <p className="font-bold">Description</p> 
          {/* <Input placeholder="" value={description} 
            onChange={
                (e) => setDescription(e.target.value)
            } 
          /> */}
          <Textarea placeholder="" value={description} className="h-32"
            onChange={
                (e) => setDescription(e.target.value)
            } 
          />          
        </label>
        
        <label className="text-xs font-medium text-slate-700">
          <p className="font-bold">Publication year</p>
          <Input placeholder="" type="number" value={publishedYear}
            
            onChange={
              (e) => setPublishedYear(e.target.value)
            } 
          />
        </label>

        <label className="text-xs font-medium text-slate-700">
          <p className="font-bold">Number of Copies</p>

          <Input placeholder="" type="number" value={totalCopies} 
              onChange={
                (e) => setTotalCopies(e.target.value)
              } 
          />
        </label>

        
        <label className="text-xs font-medium text-slate-700">
          <p className="font-bold">Copies Available</p>

          <Input placeholder="" type="number" 
                value={availableCopies} 
                onChange={
                    (e) => setAvailableCopies(e.target.value)
                } 
          />          
        </label>



        <div className="space-y-1 gap-1 flex flex-col w-full">
            <label className="text-sm font-medium">
              <p className="font-bold">Cover Image</p>
            </label>
          

              <label className="flex flex-col border-2 border-dashed 
                border-black p-4 w-full rounded-xl 
                items-center justify-center cursor-pointer 
                hover:bg-gray-50 transition-colors">  
                
                    <input
                        type="file" 
                        accept="image/*"
                        onChange={handleCoverChange}
                        className="hidden" 
                    />

                    <div className="flex items-center justify-center pt-2 w-12 h-13 
                                    rounded-xl border-1 border-gray-400 mb-3">

                        <img src={UploadIcon} alt="Upload Icon"  
                            className="w-6 h-7 rounded" />

                    </div>
                    
                    <p className="text-center mb-1 text-sm">
                        <span className="text-blue-600 font-bold hover:underline">Click to upload</span>
                        <span className="font-medium"> or drag and drop</span>
                    </p>
                    
                    <p className="text-sm font-medium">PNG or JPG (max. 5mb)</p>
                    
                    {
                        coverImageBase64 && (
                            <img src={coverImageBase64} alt="preview"
                                className="w-24 h-32 object-cover rounded mt-4" />
                        )
                    }
              </label>

            {/* <div className="flex flex-col border-2 border-dashed 
                            border-black p-4 w-10 w-full rounded-xl 
                            items-center justify-center ">  

                <div className="flex items-center justify-center pt-2 w-12 h-13 rounded-xl border-1 border-gray-400">
                  <img src={UploadIcon} alt="Upload Icon"  
                      className="w-6 h-7  rounded mb-2" />
                </div>

                <input
                  type="file"  accept="image/*"
                  placeholder="Click up Upload"
                  onChange={                
                      // (e) => setCoverImage( e.target.files?.[0] ?? null)
                      handleCoverChange
                  }
                  className="w-full text-sm"
                
                />

                { 
                  coverImageBase64 && (
                  <img src={ coverImageBase64} alt="preview"
                      className="w-24 h-32 object-cover rounded" />
                )}
            </div> */}

        </div>     



        <div className="flex gap-5 justify-start w-full">

            <Button variant="outline" className="w-1/2"          
              onClick={                
                () => navigate('/admin/books')              
              }>
              Discard
            </Button>

            <Button disabled={isPending} className="bg-[#1C65DA] w-1/2"
              onClick={handleSubmit}>
              
              {isPending ? 'Processing...' : isEdit ? 'Update' : 'Save'}
            
            </Button>        
        </div>

      </div>

    </div>


  )
}

export default AddEditBookPage
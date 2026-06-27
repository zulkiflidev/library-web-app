import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import useCategories from '@/hooks/useCategories'
import useAuthors from '@/hooks/admin/useAuthors'
import useAddAuthor from '@/hooks/admin/useAddAuthor'
import useAddCategory from '@/hooks/admin/useAddCategory'

import { useAddBook, useEditBook } from '@/hooks/admin/useAdminBooksMutation'
import useBookDetail from '@/hooks/useBookDetail'

import type { ChangeEvent } from 'react';




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
      <h1 className="text-2xl font-bold">{isEdit ? 'Edit Buku' : 'Tambah Buku'}</h1>

      <div className="space-y-4">
        <Input placeholder="Judul" value={title}
             onChange={
        
              (e) => setTitle(e.target.value)
        
            } 
        />
        
        <Input placeholder="ISBN" value={isbn} 
        
        onChange={          
            (e) => setIsbn(e.target.value)
          } 
        />
        
        <Input placeholder="Deskripsi" value={description} 
        onChange={
            (e) => setDescription(e.target.value)
        } />
        
        <Input placeholder="Tahun Terbit" type="number" value={publishedYear}
          
          onChange={
            (e) => setPublishedYear(e.target.value)
          } 
        />
        
        <Input placeholder="Total Kopian" type="number" value={totalCopies} 
            onChange={
              (e) => setTotalCopies(e.target.value)
            } 
        />
        
        <Input placeholder="Kopian Tersedia" type="number" 
               value={availableCopies} 
               onChange={
                  (e) => setAvailableCopies(e.target.value)
               } 
        />

        <div className="space-y-1">
          <label className="text-sm font-medium">Cover Image (max 5MB)</label>
         
          <input
            type="file"
            accept="image/*"
            onChange={
              
                // (e) => setCoverImage( e.target.files?.[0] ?? null)
                handleCoverChange

              }
            className="w-full text-sm"
          />

          { coverImageBase64 && (

            <img src={ coverImageBase64} alt="preview"
                 className="w-24 h-32 object-cover rounded" />
          )}

        </div>

        <div className="space-y-2">
          <select
            className="w-full border rounded-md px-3 py-2 text-sm bg-background"
            value={categoryId}

            onChange={
              
              (e) => setCategoryId(e.target.value)
            
            }
          >
            <option value="">Pilih Kategori</option>

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
            size="sm" variant="outline"
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

        {/* Pilih Author */}
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
            <option value="">Pilih Author</option>
            {authorsData?.authors.map((author) => (
              <option key={author.id} 
                      value={author.id}>{author.name}
              </option>
            
            ))}
          </select>
          
          <Button
            size="sm" variant="outline"
            onClick={
            
              () => setShowAddAuthor(!showAddAuthor)
            
            }
          >
            + Tambah Author Baru
          
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

        <div className="flex gap-2 justify-end">

          <Button variant="outline" 
          
            onClick={
              
              () => navigate('/admin/books')
            
            }>

            Batal
          </Button>

          <Button disabled={isPending} 
            onClick={handleSubmit}>
            
            {isPending ? 'Menyimpan...' : isEdit ? 'Update' : 'Tambah'}
          
          </Button>
        
        </div>

      </div>

    </div>


  )
}

export default AddEditBookPage
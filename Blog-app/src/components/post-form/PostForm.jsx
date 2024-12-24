/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars

import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button"
import Input from "../Input"
import RTE from "../RTE";
import Select from "../Select"
import appwriteService from "../../appwrite/config"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function PostForm ({post}) {
    const {register , handleSubmit ,watch, setValue, control , getValues} = useForm({
        defaultValues:{
            title: post?.title || "" ,
            slug: post?.slug || "" ,
            content: post?.content || "",
            status: post?.status.toLowerCase() || "Active"
        }
    })

    const navigate = useNavigate()
    const userData = useSelector((state)=> state.auth.userData)

    const submit = async (data) => {
        try {
            let fileId = post?.featuredImage;

            if ( data.image && data.image[0]){
                const file = await appwriteService.uploadFile(data.image[0])
                if (file){
                    fileId = file.$id;
                }
            }
              // Debug data being sent
            console.log('Submitting data:', {
                ...data,
                featuredImage: fileId,
                userId: userData.$id
            });
            // if (!fileId) {
            //     throw new Error('Missing required attribute "featuredImage"');
            // }

            if (post){
                const dbpost = await appwriteService.updatePost(post.$id , {
                    ...data,
                    featuredImage: fileId
                });
                if (dbpost){
                    navigate(`/post/${dbpost.$id}`)
                }
            }else{
                const dbpost = await appwriteService.createPost({
                    ...data,
                    featuredImage: fileId,
                    userId: userData.$id,
                    status: data.status || 'active' // Ensure status is lowercase

                });
                if (dbpost){
                    navigate(`/post/${dbpost.$id}`)
                }
            }

        } catch (error) {
            console.log("PostForm :: submit()",error)
        }
    }


    const slugTransform = useCallback ((value) => {
        if (value && typeof value === "string") {
            return value.trim()
              .toLowerCase()
              .replace(/[^a-zA-Z\d\s]+/g, '-')
              .replace(/\s/g, "-")
        }
        return value
    },[])

    React.useEffect(() => { 
        watch((value ,{name}) => {
        if (name === "title" ) { 
            setValue("slug" , slugTransform(value.title) ,{shouldValidate:true}) }
    } ) }, [watch , slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit (submit)}
        className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                label = "Title"
                placeholder = "Title"
                className = "mb-4"
                { ...register( "title" , {required : true})}
                />
                <Input
                label = "Slug"
                placeholder = "Slug"
                className = "mb-4"
                {...register("slug" , { required : true })}
                onInput = { (e) => {
                    setValue( "slug", slugTransform(e.currentTarget.value)
                    ,{shouldValidate:true})}}
                />
                <RTE
                label="Content"
                name="content"
                control={control}
                defaultValue={getValues("content")}
                />

            </div>
            <div className="1/3 px-2">
                <input
                label = "Featured Image"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg"
                {...register( "image" ,{required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg"/>
                    </div>
                )}
                <Select
                options = { ["active" , "inactive"]}
                label = "Status"
                className = "mb-4"
                placeholder = "Select Status"
                {...register("status" ,{required: true})}
                />
                <Button
                type="submit"
                bgColor={post? "bg-blue-500" : undefined}
                className="w-full mb-4 hover:bg-700 click:bg-blue-900">
                    {post? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}
export default PostForm

        // const submit = async (data) => {
    //     if (post){
    //         const file = data.image[0] ?
    //          await appwriteService.uploadFile(data.image[0]) : null

    //         if (file){
    //             appwriteService.deleteFile(post.featuredImage)
    //         }
    //         const dbPost = await appwriteService
    //          .updatePost(post.$id , { 
    //             ...data ,
    //             featuredImage : file ? file.$id : undefined
    //         })
    //         if (dbPost) {
    //             navigate( `/post/${dbPost.$id}`)
    //         }

    //     }else{
    //         const file = appwriteService.uploadFile(data.image[0])
    //         if (file) {
    //            const fileId = data.$id
    //            data.featuredImage = fileId 
    //            const dbPost = appwriteService.
    //              createPost({...data , userId: userData.$id})

    //            if (dbPost){
    //             navigate( `/post/${dbPost.$id}`)
    //            }
    //         }
    //     }
    // }
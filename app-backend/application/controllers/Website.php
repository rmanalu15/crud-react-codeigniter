<?php
/*=============================================================================================
*|Name : Rupinda Manalu                                                                       |
*|       Barus - Sumatera Utara                                                               |
* =============================================================================================
*/

use Restserver\Libraries\REST_Controller;

defined('BASEPATH') or exit('No direct script access allowed');

header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    exit;
}

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';



class Website extends REST_Controller
{
    function index_get()
    {
        $websites = $this->db->get('website')->result_array();

        if ($websites) {
            $this->response($websites, 200);
        } else {
            $this->response(array(), 200);
        }
    }

    function website_get()
    {
        if (!$this->get('id')) {
            $this->response(NULL, 400);
        }

        $website = $this->db->get_where('website', ['id' => $this->get('id')])->row_array();

        if ($website) {
            $this->response($website, 200);
        } else {
            $this->response(array(), 500);
        }
    }

    function add_website_post()
    {
        $website_title = $this->post('title');
        $website_url = $this->post('url');
        $data = [
            'title' => $website_title,
            'url' => $website_url
        ];
        $result = $this->db->insert('website', $data);

        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }

    function update_website_put()
    {
        $website_id = $this->put('id');
        $website_title = $this->put('title');
        $website_url = $this->put('url');

        $data = [
            'title' => $website_title,
            'url' => $website_url
        ];
        $this->db->where('id', $website_id);
        $result = $this->db->update('website', $data);

        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }

    function delete_website_delete($website_id)
    {
        $this->db->where('id', $website_id);
        $result = $this->db->delete('website');

        if ($result === FALSE) {
            $this->response(array('status' => 'failed'));
        } else {
            $this->response(array('status' => 'success'));
        }
    }
}
